import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'dart:ui';

class AppColors {
  static const primary = Color(0xFF6C63FF);
  static const background = Color(0xFF0F0F1A);
  static const surface = Color(0xFF1E1E32);
  static const surfaceLight = Color(0xFF252542);
  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFFB8B8D0);
  static const success = Color(0xFF00D68F);
  static const warning = Color(0xFFFFB84D);
  static const danger = Color(0xFFFF6B6B);
}

// --- State ---
enum PhishingScanStatus { idle, scanning, result }

class PhishingState {
  final PhishingScanStatus status;
  final double score;
  final String category;
  final String resultTitle;
  final String explanation;

  PhishingState({
    this.status = PhishingScanStatus.idle,
    this.score = 0,
    this.category = '',
    this.resultTitle = '',
    this.explanation = '',
  });

  PhishingState copyWith({
    PhishingScanStatus? status,
    double? score,
    String? category,
    String? resultTitle,
    String? explanation,
  }) {
    return PhishingState(
      status: status ?? this.status,
      score: score ?? this.score,
      category: category ?? this.category,
      resultTitle: resultTitle ?? this.resultTitle,
      explanation: explanation ?? this.explanation,
    );
  }
}

class PhishingNotifier extends StateNotifier<PhishingState> {
  PhishingNotifier() : super(PhishingState());

  void scanUrl(String url) async {
    state = state.copyWith(status: PhishingScanStatus.scanning);
    await Future.delayed(const Duration(seconds: 2));
    
    if (url.contains('secure')) {
      state = state.copyWith(
        status: PhishingScanStatus.result,
        score: 95,
        category: 'Safe',
        resultTitle: 'Safe URL',
        explanation: 'This URL appears safe and shows no signs of malicious activity.',
      );
    } else {
      state = state.copyWith(
        status: PhishingScanStatus.result,
        score: 23,
        category: 'Phishing',
        resultTitle: 'Dangerous URL Detected',
        explanation: 'This link has been flagged for phishing. It attempts to mimic a legitimate service.',
      );
    }
  }

  void scanSms(String sms) async {
    state = state.copyWith(status: PhishingScanStatus.scanning);
    await Future.delayed(const Duration(seconds: 2));
    state = state.copyWith(
      status: PhishingScanStatus.result,
      score: 15,
      category: 'Scam',
      resultTitle: 'Suspicious SMS',
      explanation: 'Contains urgent requests and unknown links typical of SMS phishing.',
    );
  }

  void reset() {
    state = PhishingState();
  }
}

final phishingProvider = StateNotifierProvider<PhishingNotifier, PhishingState>((ref) {
  return PhishingNotifier();
});

// --- Page ---
class PhishingShieldPage extends ConsumerStatefulWidget {
  const PhishingShieldPage({super.key});

  @override
  ConsumerState<PhishingShieldPage> createState() => _PhishingShieldPageState();
}

class _PhishingShieldPageState extends ConsumerState<PhishingShieldPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _urlController = TextEditingController();
  final _smsController = TextEditingController(text: 'Your bank account has been locked. Click here to verify your identity: http://secure-update-login.com');

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _urlController.dispose();
    _smsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Phishing Shield', style: TextStyle(color: AppColors.textPrimary, fontFamily: 'Poppins', fontWeight: FontWeight.bold)),
        centerTitle: true,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primary,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textSecondary,
          labelStyle: const TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.w600),
          tabs: const [
            Tab(text: 'URL'),
            Tab(text: 'SMS'),
            Tab(text: 'QR Code'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildUrlTab(),
          _buildSmsTab(),
          _buildQrTab(),
        ],
      ),
    );
  }

  Widget _buildUrlTab() {
    final state = ref.watch(phishingProvider);
    
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Check Link Safety',
            style: TextStyle(color: AppColors.textPrimary, fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Poppins'),
          ),
          const SizedBox(height: 16),
          _buildGlassCard(
            child: TextField(
              controller: _urlController,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: InputDecoration(
                hintText: 'Enter URL to scan...',
                hintStyle: const TextStyle(color: AppColors.textSecondary),
                prefixIcon: const Icon(Icons.search, color: AppColors.textSecondary),
                border: InputBorder.none,
                suffixIcon: IconButton(
                  icon: const Icon(Icons.paste, color: AppColors.primary),
                  onPressed: () async {
                    final data = await Clipboard.getData(Clipboard.kTextPlain);
                    if (data != null && data.text != null) {
                      _urlController.text = data.text!;
                    }
                  },
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          _buildGradientButton('Scan URL', () {
            if (_urlController.text.isNotEmpty) {
              ref.read(phishingProvider.notifier).scanUrl(_urlController.text);
            }
          }),
          const SizedBox(height: 32),
          if (state.status == PhishingScanStatus.scanning)
            const Center(child: CircularProgressIndicator(color: AppColors.primary))
                .animate().fade(),
          if (state.status == PhishingScanStatus.result)
            _buildResultCard(state).animate().slideY(begin: 0.2, end: 0).fade(),
        ],
      ),
    );
  }

  Widget _buildSmsTab() {
    final state = ref.watch(phishingProvider);
    
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Analyze Message',
            style: TextStyle(color: AppColors.textPrimary, fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Poppins'),
          ),
          const SizedBox(height: 16),
          _buildGlassCard(
            child: TextField(
              controller: _smsController,
              maxLines: 5,
              style: const TextStyle(color: AppColors.textPrimary),
              decoration: const InputDecoration(
                hintText: 'Paste suspicious SMS here...',
                hintStyle: TextStyle(color: AppColors.textSecondary),
                border: InputBorder.none,
                contentPadding: EdgeInsets.all(16),
              ),
            ),
          ),
          const SizedBox(height: 24),
          _buildGradientButton('Analyze Text', () {
            if (_smsController.text.isNotEmpty) {
              ref.read(phishingProvider.notifier).scanSms(_smsController.text);
            }
          }),
          const SizedBox(height: 32),
          if (state.status == PhishingScanStatus.scanning)
            const Center(child: CircularProgressIndicator(color: AppColors.primary))
                .animate().fade(),
          if (state.status == PhishingScanStatus.result)
            _buildResultCard(state).animate().slideY(begin: 0.2, end: 0).fade(),
        ],
      ),
    );
  }

  Widget _buildQrTab() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.surfaceLight, width: 2),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  const Icon(Icons.qr_code_scanner, size: 120, color: AppColors.surfaceLight),
                  // Corner brackets mock
                  Positioned(top: 24, left: 24, child: _buildCorner(0)),
                  Positioned(top: 24, right: 24, child: _buildCorner(1)),
                  Positioned(bottom: 24, left: 24, child: _buildCorner(2)),
                  Positioned(bottom: 24, right: 24, child: _buildCorner(3)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          _buildGradientButton('Tap to start camera', () {}),
          const SizedBox(height: 24),
          const Align(
            alignment: Alignment.centerLeft,
            child: Text('Recent Scans', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
          ),
          const SizedBox(height: 16),
          _buildGlassCard(
            padding: const EdgeInsets.all(16),
            child: const Row(
              children: [
                Icon(Icons.link, color: AppColors.success),
                SizedBox(width: 16),
                Expanded(child: Text('menu.restaurant.com/qr', style: TextStyle(color: AppColors.textPrimary))),
                Text('Safe', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.bold)),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildCorner(int index) {
    return Container(
      width: 40, height: 40,
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(color: index < 2 ? AppColors.primary : Colors.transparent, width: 4),
          bottom: BorderSide(color: index >= 2 ? AppColors.primary : Colors.transparent, width: 4),
          left: BorderSide(color: index % 2 == 0 ? AppColors.primary : Colors.transparent, width: 4),
          right: BorderSide(color: index % 2 != 0 ? AppColors.primary : Colors.transparent, width: 4),
        ),
      ),
    );
  }

  Widget _buildResultCard(PhishingState state) {
    final isDanger = state.score < 50;
    final color = isDanger ? AppColors.danger : AppColors.success;
    
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Icon(isDanger ? Icons.warning_amber_rounded : Icons.check_circle_outline, color: color, size: 64),
          const SizedBox(height: 16),
          Text(state.resultTitle, style: TextStyle(color: color, fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
          const SizedBox(height: 8),
          Text('Safety Score: ${state.score.toInt()}/100', style: const TextStyle(color: AppColors.textPrimary, fontSize: 18, fontFamily: 'Poppins')),
          const SizedBox(height: 16),
          Text(state.explanation, textAlign: TextAlign.center, style: const TextStyle(color: AppColors.textSecondary)),
          const SizedBox(height: 24),
          _buildRiskFactor('Domain Age', isDanger ? 'Less than 1 month' : '5+ years', isDanger),
          _buildRiskFactor('SSL Status', 'Valid', false),
          _buildRiskFactor('Blacklist Status', isDanger ? 'Listed on 2 DBs' : 'Clean', isDanger),
          const SizedBox(height: 24),
          if (isDanger)
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.danger,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                minimumSize: const Size(double.infinity, 50),
              ),
              child: const Text('Report Threat', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
            ),
        ],
      ),
    );
  }

  Widget _buildRiskFactor(String label, String value, bool isDanger) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: AppColors.textSecondary)),
          Text(value, style: TextStyle(color: isDanger ? AppColors.danger : AppColors.success, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildGlassCard({required Widget child, EdgeInsetsGeometry padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 4)}) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: AppColors.surface.withOpacity(0.5),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.surfaceLight.withOpacity(0.5)),
          ),
          child: child,
        ),
      ),
    );
  }

  Widget _buildGradientButton(String text, VoidCallback onPressed) {
    return Container(
      height: 56,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(colors: [Color(0xFF6C63FF), Color(0xFF3F3D56)]),
        boxShadow: [
          BoxShadow(color: AppColors.primary.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4)),
        ],
      ),
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        child: Text(text, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
      ),
    );
  }
}
