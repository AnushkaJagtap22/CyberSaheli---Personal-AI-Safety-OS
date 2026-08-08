import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';

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

enum ChatGuardianStatus { idle, analyzing, result }

class ChatGuardianState {
  final ChatGuardianStatus status;
  final double progress;
  
  ChatGuardianState({
    this.status = ChatGuardianStatus.idle,
    this.progress = 0.0,
  });

  ChatGuardianState copyWith({
    ChatGuardianStatus? status,
    double? progress,
  }) {
    return ChatGuardianState(
      status: status ?? this.status,
      progress: progress ?? this.progress,
    );
  }
}

class ChatGuardianNotifier extends StateNotifier<ChatGuardianState> {
  ChatGuardianNotifier() : super(ChatGuardianState());

  void startAnalysis() async {
    state = state.copyWith(status: ChatGuardianStatus.analyzing, progress: 0.0);
    
    for (int i = 0; i <= 100; i += 5) {
      await Future.delayed(const Duration(milliseconds: 100));
      state = state.copyWith(progress: i / 100);
    }

    state = state.copyWith(status: ChatGuardianStatus.result);
  }

  void reset() {
    state = ChatGuardianState();
  }
}

final chatGuardianProvider = StateNotifierProvider<ChatGuardianNotifier, ChatGuardianState>((ref) => ChatGuardianNotifier());

class ChatGuardianPage extends ConsumerWidget {
  const ChatGuardianPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(chatGuardianProvider);
    
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () {
            if (state.status != ChatGuardianStatus.idle) {
              ref.read(chatGuardianProvider.notifier).reset();
            } else {
              Navigator.of(context).pop();
            }
          },
        ),
        title: const Text(
          'Chat Guardian',
          style: TextStyle(
            color: AppColors.textPrimary,
            fontFamily: 'Poppins',
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (state.status == ChatGuardianStatus.idle) _buildIdleState(ref),
              if (state.status == ChatGuardianStatus.analyzing) _buildAnalyzingState(state),
              if (state.status == ChatGuardianStatus.result) _buildResultState(ref),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildIdleState(WidgetRef ref) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Analyze chats for threats and manipulation',
          textAlign: TextAlign.center,
          style: TextStyle(
            color: AppColors.textSecondary,
            fontFamily: 'Poppins',
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 32),
        _buildImportCard(
          icon: Icons.upload_file,
          title: 'Upload Chat Export',
          subtitle: 'WhatsApp .txt file',
          onTap: () => ref.read(chatGuardianProvider.notifier).startAnalysis(),
        ).animate().fadeIn(duration: 400.ms).slideX(begin: -0.1),
        const SizedBox(height: 16),
        _buildImportCard(
          icon: Icons.content_paste,
          title: 'Paste Text',
          subtitle: 'Copy & paste conversation',
          onTap: () => ref.read(chatGuardianProvider.notifier).startAnalysis(),
        ).animate().fadeIn(delay: 100.ms, duration: 400.ms).slideX(begin: -0.1),
        const SizedBox(height: 16),
        _buildImportCard(
          icon: Icons.image,
          title: 'Screenshot Analysis',
          subtitle: 'Upload images of chat',
          onTap: () => ref.read(chatGuardianProvider.notifier).startAnalysis(),
        ).animate().fadeIn(delay: 200.ms, duration: 400.ms).slideX(begin: -0.1),
        const SizedBox(height: 32),
        const Center(
          child: Text(
            'Supported formats: .txt, .jpg, .png',
            style: TextStyle(
              color: AppColors.textSecondary,
              fontFamily: 'Poppins',
              fontSize: 12,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildImportCard({required IconData icon, required String title, required String subtitle, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.surfaceLight),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, 4),
            )
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: AppColors.primary, size: 28),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontFamily: 'Poppins',
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, color: AppColors.textSecondary, size: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalyzingState(ChatGuardianState state) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(height: 64),
        const Icon(Icons.shield_outlined, size: 80, color: AppColors.primary)
            .animate(onPlay: (controller) => controller.repeat(reverse: true))
            .scale(begin: const Offset(0.9, 0.9), end: const Offset(1.1, 1.1), duration: 1.seconds),
        const SizedBox(height: 32),
        const Text(
          'Analyzing conversation...',
          style: TextStyle(
            color: AppColors.textPrimary,
            fontFamily: 'Poppins',
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 24),
        ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: LinearProgressIndicator(
            value: state.progress,
            minHeight: 12,
            backgroundColor: AppColors.surface,
            valueColor: AlwaysStoppedAnimation<Color>(
              Color.lerp(AppColors.primary, AppColors.danger, state.progress) ?? AppColors.primary,
            ),
          ),
        ),
      ],
    ).animate().fadeIn();
  }

  Widget _buildResultState(WidgetRef ref) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.danger.withOpacity(0.15),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppColors.danger.withOpacity(0.5)),
          ),
          child: const Text(
            'HIGH RISK DETECTED',
            style: TextStyle(
              color: AppColors.danger,
              fontFamily: 'Poppins',
              fontWeight: FontWeight.bold,
              letterSpacing: 1.5,
            ),
          ),
        ).animate().fadeIn(delay: 200.ms).slideY(begin: -0.2),
        const SizedBox(height: 32),
        
        // Threat Meter
        Stack(
          alignment: Alignment.center,
          children: [
            SizedBox(
              height: 160,
              width: 160,
              child: CircularProgressIndicator(
                value: 0.65,
                strokeWidth: 16,
                backgroundColor: AppColors.surface,
                color: AppColors.danger,
                strokeCap: StrokeCap.round,
              ),
            ),
            Column(
              children: [
                const Text(
                  '65%',
                  style: TextStyle(
                    color: AppColors.textPrimary,
                    fontSize: 42,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Poppins',
                  ),
                ),
                Text(
                  'Threat Level',
                  style: TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 14,
                    fontFamily: 'Poppins',
                  ),
                ),
              ],
            ),
          ],
        ).animate().scale(duration: 600.ms, curve: Curves.easeOutBack),
        
        const SizedBox(height: 32),
        
        _buildThreatCard(
          'Blackmail attempt detected',
          'Explicit demands in exchange for keeping information secret.',
          92,
        ).animate().fadeIn(delay: 400.ms).slideX(begin: 0.1),
        const SizedBox(height: 12),
        _buildThreatCard(
          'Manipulation tactics identified',
          'Gaslighting and coercive language patterns present.',
          78,
        ).animate().fadeIn(delay: 500.ms).slideX(begin: 0.1),
        const SizedBox(height: 12),
        _buildThreatCard(
          'Sextortion pattern indicators',
          'Request for intimate media followed by sudden aggressive tone.',
          85,
        ).animate().fadeIn(delay: 600.ms).slideX(begin: 0.1),
        
        const SizedBox(height: 24),
        
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.danger.withOpacity(0.3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: const [
                  Icon(Icons.info_outline, color: AppColors.warning, size: 20),
                  SizedBox(width: 8),
                  Text(
                    'Risk Explanation',
                    style: TextStyle(
                      color: AppColors.textPrimary,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const Text(
                'The conversation shows clear signs of coercive control and blackmail. The sender is using aggressive language patterns typical of sextortion scams.',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Recommended Actions:',
                style: TextStyle(
                  color: AppColors.textPrimary,
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 8),
              _buildActionItem('1', 'Document all evidence immediately'),
              _buildActionItem('2', 'Do not respond to the sender'),
              _buildActionItem('3', 'Report to Cyber Crime Portal'),
              _buildActionItem('4', 'Contact trusted person'),
              _buildActionItem('5', 'File formal complaint'),
            ],
          ),
        ).animate().fadeIn(delay: 700.ms).slideY(begin: 0.1),
        
        const SizedBox(height: 32),
        
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            padding: const EdgeInsets.symmetric(vertical: 16),
            minimumSize: const Size(double.infinity, 50),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: const Text(
            'Save to Evidence Vault',
            style: TextStyle(
              fontFamily: 'Poppins',
              fontWeight: FontWeight.w600,
              fontSize: 16,
              color: Colors.white,
            ),
          ),
        ).animate().fadeIn(delay: 800.ms),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () {},
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.primary),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Get AI Advice',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.danger.withOpacity(0.2),
                  foregroundColor: AppColors.danger,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Report Now',
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ).animate().fadeIn(delay: 900.ms),
      ],
    );
  }

  Widget _buildThreatCard(String title, String description, int confidence) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.danger.withOpacity(0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.warning_amber_rounded, color: AppColors.warning, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    color: AppColors.textPrimary,
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.danger.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '$confidence%',
                  style: const TextStyle(
                    color: AppColors.danger,
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(
              color: AppColors.textSecondary,
              fontFamily: 'Poppins',
              fontSize: 13,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionItem(String number, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                number,
                style: const TextStyle(
                  color: AppColors.primary,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: AppColors.textSecondary,
                fontFamily: 'Poppins',
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
