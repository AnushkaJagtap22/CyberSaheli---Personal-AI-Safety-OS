import 'package:flutter/material.dart';
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

enum CheckStep { input, analyzing, result }

class BackgroundCheckState {
  final CheckStep step;
  final int currentAnalysisIndex;

  BackgroundCheckState({this.step = CheckStep.input, this.currentAnalysisIndex = 0});

  BackgroundCheckState copyWith({CheckStep? step, int? currentAnalysisIndex}) {
    return BackgroundCheckState(
      step: step ?? this.step,
      currentAnalysisIndex: currentAnalysisIndex ?? this.currentAnalysisIndex,
    );
  }
}

class BackgroundCheckNotifier extends StateNotifier<BackgroundCheckState> {
  BackgroundCheckNotifier() : super(BackgroundCheckState());

  void startAnalysis() async {
    state = state.copyWith(step: CheckStep.analyzing, currentAnalysisIndex: 0);
    
    for (int i = 0; i < 6; i++) {
      await Future.delayed(const Duration(milliseconds: 800));
      if (mounted) {
        state = state.copyWith(currentAnalysisIndex: i + 1);
      }
    }
    
    await Future.delayed(const Duration(milliseconds: 500));
    if (mounted) {
      state = state.copyWith(step: CheckStep.result);
    }
  }

  void reset() {
    state = BackgroundCheckState();
  }
}

final backgroundCheckProvider = StateNotifierProvider<BackgroundCheckNotifier, BackgroundCheckState>((ref) {
  return BackgroundCheckNotifier();
});

class BackgroundCheckPage extends ConsumerWidget {
  const BackgroundCheckPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(backgroundCheckProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Background Check AI', style: TextStyle(color: AppColors.textPrimary, fontFamily: 'Poppins', fontWeight: FontWeight.bold)),
        leading: state.step != CheckStep.input 
            ? IconButton(
                icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
                onPressed: () => ref.read(backgroundCheckProvider.notifier).reset(),
              )
            : const BackButton(color: AppColors.textPrimary),
      ),
      body: SafeArea(
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 500),
          child: _buildBody(state, ref),
        ),
      ),
    );
  }

  Widget _buildBody(BackgroundCheckState state, WidgetRef ref) {
    switch (state.step) {
      case CheckStep.input:
        return _buildInputForm(ref);
      case CheckStep.analyzing:
        return _buildAnalysisProgress(state.currentAnalysisIndex);
      case CheckStep.result:
        return _buildResultReport();
    }
  }

  Widget _buildInputForm(WidgetRef ref) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('AI-assisted profile risk assessment', style: TextStyle(color: AppColors.textSecondary, fontSize: 16, fontFamily: 'Poppins')),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.warning.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.warning.withOpacity(0.3)),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: AppColors.warning, size: 20),
                SizedBox(width: 12),
                Expanded(child: Text('This is an AI evaluation using publicly available information only.', style: TextStyle(color: AppColors.warning, fontSize: 12))),
              ],
            ),
          ),
          const SizedBox(height: 24),
          _buildGlassCard(
            child: Column(
              children: [
                _buildTextField('Instagram URL', Icons.camera_alt),
                const Divider(color: AppColors.surfaceLight),
                _buildTextField('Facebook URL', Icons.facebook),
                const Divider(color: AppColors.surfaceLight),
                _buildTextField('LinkedIn URL', Icons.work),
                const Divider(color: AppColors.surfaceLight),
                _buildTextField('Username/Handle', Icons.person),
                const Divider(color: AppColors.surfaceLight),
                _buildTextField('Phone (optional)', Icons.phone),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(child: _buildSecondaryButton('Upload Profile Screenshot', Icons.image)),
              const SizedBox(width: 16),
              Expanded(child: _buildSecondaryButton('Upload Profile Photo', Icons.person_add_alt_1)),
            ],
          ),
          const SizedBox(height: 32),
          _buildGradientButton('Generate Risk Assessment', () {
            ref.read(backgroundCheckProvider.notifier).startAnalysis();
          }),
        ],
      ),
    );
  }

  Widget _buildAnalysisProgress(int currentStep) {
    final steps = [
      'Profile Authenticity Check',
      'Image Analysis',
      'Public Activity Scan',
      'Language Pattern Analysis',
      'Cross-Platform Verification',
      'Risk Score Calculation',
    ];

    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(color: AppColors.primary).animate().scale(duration: 400.ms, curve: Curves.easeOut),
          const SizedBox(height: 48),
          ...List.generate(steps.length, (index) {
            final isCompleted = currentStep > index;
            final isCurrent = currentStep == index;
            
            return Padding(
              padding: const EdgeInsets.only(bottom: 24.0),
              child: Row(
                children: [
                  Container(
                    width: 24, height: 24,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isCompleted ? AppColors.success : (isCurrent ? AppColors.primary : AppColors.surfaceLight),
                    ),
                    child: isCompleted 
                        ? const Icon(Icons.check, size: 16, color: Colors.white) 
                        : (isCurrent ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : null),
                  ),
                  const SizedBox(width: 16),
                  Text(
                    steps[index],
                    style: TextStyle(
                      color: isCompleted || isCurrent ? AppColors.textPrimary : AppColors.textSecondary,
                      fontFamily: 'Poppins',
                      fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ).animate(target: isCompleted || isCurrent ? 1 : 0).fade(duration: 300.ms).slideX(begin: 0.1, end: 0);
          }),
        ],
      ),
    );
  }

  Widget _buildResultReport() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 120, height: 120,
                child: CircularProgressIndicator(
                  value: 0.68,
                  strokeWidth: 12,
                  color: AppColors.warning,
                  backgroundColor: AppColors.surfaceLight,
                ),
              ),
              const Column(
                children: [
                  Text('68/100', style: TextStyle(color: AppColors.textPrimary, fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Poppins')),
                  Text('MEDIUM RISK', style: TextStyle(color: AppColors.warning, fontSize: 10, fontWeight: FontWeight.bold)),
                ],
              )
            ],
          ).animate().scale(delay: 200.ms, duration: 500.ms, curve: Curves.easeOutBack),
          const SizedBox(height: 16),
          const Text('Confidence Level: 78%', style: TextStyle(color: AppColors.textSecondary)),
          const SizedBox(height: 32),
          
          _buildGlassCard(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Analysis Breakdown', style: TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                _buildBreakdownItem('Profile Authenticity', 'Moderate', AppColors.warning),
                _buildBreakdownItem('Public Identity Consistency', 'Low Concern', AppColors.success),
                _buildBreakdownItem('Scam Pattern Indicators', '2 found', AppColors.danger),
                _buildBreakdownItem('Image Analysis', 'No manipulation detected', AppColors.success),
                _buildBreakdownItem('Language Behaviour', 'Aggressive patterns noted', AppColors.warning),
                _buildBreakdownItem('Public Risk Signals', '1 complaint found', AppColors.danger),
              ],
            ),
          ).animate().slideY(begin: 0.2, end: 0, delay: 400.ms).fade(),
          
          const SizedBox(height: 24),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _buildSignalsList('Positive Signals', ['Profile active for 3+ yrs', 'Consistent posting history', 'Verified email on platform'], true).animate().slideX(begin: -0.2, end: 0, delay: 600.ms).fade()),
              const SizedBox(width: 16),
              Expanded(child: _buildSignalsList('Red Flags', ['Recently changed name', 'Multiple report complaints', 'Inconsistent location data'], false).animate().slideX(begin: 0.2, end: 0, delay: 600.ms).fade()),
            ],
          ),
          
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.warning.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.warning.withOpacity(0.3)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.shield, color: AppColors.warning),
                    SizedBox(width: 8),
                    Text('Safety Advice', style: TextStyle(color: AppColors.warning, fontWeight: FontWeight.bold, fontSize: 16)),
                  ],
                ),
                SizedBox(height: 12),
                Text(
                  'Exercise caution when interacting with this profile. Do not share personal information, financial details, or agree to meet in unverified locations. The recent name change and reported complaints suggest a potential compromised or fake account.',
                  style: TextStyle(color: AppColors.textPrimary, fontSize: 14),
                ),
              ],
            ),
          ).animate().slideY(begin: 0.2, end: 0, delay: 800.ms).fade(),
          
          const SizedBox(height: 32),
          Row(
            children: [
              Expanded(child: _buildSecondaryButton('Save Report', Icons.save_alt)),
              const SizedBox(width: 16),
              Expanded(child: _buildSecondaryButton('Share', Icons.share)),
            ],
          ),
          const SizedBox(height: 16),
          TextButton(
            onPressed: () {},
            child: const Text('Report Profile', style: TextStyle(color: AppColors.danger, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildBreakdownItem(String title, String value, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(child: Text(title, style: const TextStyle(color: AppColors.textSecondary))),
          Text(value, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildSignalsList(String title, List<String> items, bool isPositive) {
    final color = isPositive ? AppColors.success : AppColors.danger;
    final icon = isPositive ? Icons.check_circle : Icons.cancel;
    
    return _buildGlassCard(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          ...items.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(icon, size: 16, color: color),
                const SizedBox(width: 8),
                Expanded(child: Text(item, style: const TextStyle(color: AppColors.textPrimary, fontSize: 12))),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildTextField(String hint, IconData icon) {
    return TextField(
      style: const TextStyle(color: AppColors.textPrimary),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(color: AppColors.textSecondary),
        prefixIcon: Icon(icon, color: AppColors.textSecondary),
        border: InputBorder.none,
        contentPadding: const EdgeInsets.symmetric(vertical: 16),
      ),
    );
  }

  Widget _buildSecondaryButton(String text, IconData icon) {
    return OutlinedButton.icon(
      onPressed: () {},
      icon: Icon(icon, color: AppColors.primary, size: 20),
      label: Text(text, style: const TextStyle(color: AppColors.textPrimary, fontSize: 12)),
      style: OutlinedButton.styleFrom(
        side: const BorderSide(color: AppColors.primary),
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
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
}
