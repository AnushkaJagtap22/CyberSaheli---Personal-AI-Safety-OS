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

enum DeepfakeStatus { idle, analyzing, result }

class DeepfakeState {
  final DeepfakeStatus status;
  final double progress;
  final String analysisText;
  
  DeepfakeState({
    this.status = DeepfakeStatus.idle,
    this.progress = 0.0,
    this.analysisText = '',
  });

  DeepfakeState copyWith({
    DeepfakeStatus? status,
    double? progress,
    String? analysisText,
  }) {
    return DeepfakeState(
      status: status ?? this.status,
      progress: progress ?? this.progress,
      analysisText: analysisText ?? this.analysisText,
    );
  }
}

class DeepfakeNotifier extends StateNotifier<DeepfakeState> {
  DeepfakeNotifier() : super(DeepfakeState());

  void startAnalysis() async {
    state = state.copyWith(status: DeepfakeStatus.analyzing, progress: 0.0, analysisText: 'Loading model...');
    
    final steps = [
      'Loading model...',
      'Detecting faces...',
      'Analyzing artifacts...',
      'Computing confidence...'
    ];

    for (int i = 0; i < steps.length; i++) {
      await Future.delayed(const Duration(milliseconds: 750));
      state = state.copyWith(
        progress: (i + 1) / steps.length,
        analysisText: steps[i],
      );
    }

    state = state.copyWith(status: DeepfakeStatus.result);
  }

  void reset() {
    state = DeepfakeState();
  }
}

final deepfakeProvider = StateNotifierProvider<DeepfakeNotifier, DeepfakeState>((ref) => DeepfakeNotifier());

class DeepfakeScannerPage extends ConsumerWidget {
  const DeepfakeScannerPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(deepfakeProvider);
    
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () {
            if (state.status != DeepfakeStatus.idle) {
              ref.read(deepfakeProvider.notifier).reset();
            } else {
              Navigator.of(context).pop();
            }
          },
        ),
        title: const Text(
          'Deepfake Scanner',
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
              const Text(
                'AI-powered image & video analysis',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontFamily: 'Poppins',
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 32),
              if (state.status == DeepfakeStatus.idle) _buildIdleState(ref),
              if (state.status == DeepfakeStatus.analyzing) _buildAnalyzingState(state),
              if (state.status == DeepfakeStatus.result) _buildResultState(ref),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildIdleState(WidgetRef ref) {
    return Column(
      children: [
        GestureDetector(
          onTap: () => ref.read(deepfakeProvider.notifier).startAnalysis(),
          child: Container(
            height: 280,
            decoration: BoxDecoration(
              color: AppColors.surface.withOpacity(0.5),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(
                color: AppColors.primary.withOpacity(0.3),
                width: 2,
                style: BorderStyle.solid, 
              ),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.1),
                  blurRadius: 20,
                  spreadRadius: 5,
                )
              ],
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.cloud_upload_outlined,
                    size: 64,
                    color: AppColors.primary.withOpacity(0.8),
                  )
                  .animate(onPlay: (controller) => controller.repeat(reverse: true))
                  .moveY(begin: -5, end: 5, duration: 1000.ms),
                  const SizedBox(height: 16),
                  const Text(
                    'Tap to upload or capture',
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontFamily: 'Poppins',
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
          ).animate().fadeIn(duration: 400.ms).scale(begin: const Offset(0.95, 0.95)),
        ),
        const SizedBox(height: 32),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildActionButton(Icons.camera_alt, 'Camera', () => ref.read(deepfakeProvider.notifier).startAnalysis()),
            _buildActionButton(Icons.photo_library, 'Gallery', () => ref.read(deepfakeProvider.notifier).startAnalysis()),
            _buildActionButton(Icons.videocam, 'Video', () => ref.read(deepfakeProvider.notifier).startAnalysis()),
          ],
        ).animate().fadeIn(delay: 200.ms, duration: 400.ms).slideY(begin: 0.2),
      ],
    );
  }

  Widget _buildActionButton(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surface,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                )
              ],
            ),
            child: Icon(icon, color: AppColors.primary, size: 28),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: const TextStyle(
              color: AppColors.textSecondary,
              fontFamily: 'Poppins',
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnalyzingState(DeepfakeState state) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(height: 48),
        SizedBox(
          width: 120,
          height: 120,
          child: CircularProgressIndicator(
            value: state.progress,
            strokeWidth: 8,
            backgroundColor: AppColors.surface,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
          ),
        ),
        const SizedBox(height: 32),
        Text(
          'Analyzing with AI...',
          style: const TextStyle(
            color: AppColors.textPrimary,
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        )
        .animate(onPlay: (controller) => controller.repeat(reverse: true))
        .fade(begin: 0.5, end: 1.0, duration: 800.ms),
        const SizedBox(height: 16),
        Text(
          state.analysisText,
          style: const TextStyle(
            color: AppColors.primary,
            fontFamily: 'Poppins',
            fontSize: 16,
          ),
        ).animate(key: ValueKey(state.analysisText)).fadeIn().slideY(begin: 0.5),
      ],
    ).animate().fadeIn();
  }

  Widget _buildResultState(WidgetRef ref) {
    return Column(
      children: [
        Container(
          width: 160,
          height: 160,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.surface,
            boxShadow: [
              BoxShadow(
                color: AppColors.danger.withOpacity(0.2),
                blurRadius: 30,
                spreadRadius: 10,
              )
            ],
            border: Border.all(color: AppColors.danger, width: 4),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  '73%',
                  style: TextStyle(
                    color: AppColors.danger,
                    fontFamily: 'Poppins',
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Confidence',
                  style: TextStyle(
                    color: AppColors.danger.withOpacity(0.8),
                    fontFamily: 'Poppins',
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ).animate().scale(duration: 500.ms, curve: Curves.easeOutBack),
        const SizedBox(height: 24),
        const Text(
          'DEEPFAKE DETECTED',
          style: TextStyle(
            color: AppColors.danger,
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.2,
          ),
        ).animate().fadeIn(delay: 300.ms).slideY(begin: -0.2),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.danger.withOpacity(0.1),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.danger.withOpacity(0.5)),
          ),
          child: const Text(
            'HIGH RISK',
            style: TextStyle(
              color: AppColors.danger,
              fontFamily: 'Poppins',
              fontWeight: FontWeight.w600,
            ),
          ),
        ).animate().fadeIn(delay: 400.ms),
        const SizedBox(height: 32),
        _buildBreakdownGrid().animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Text(
            'Our AI model detected significant inconsistencies in facial blending and unnatural blinking patterns, which strongly suggest this media has been synthetically altered.',
            style: TextStyle(
              color: AppColors.textSecondary,
              fontFamily: 'Poppins',
              fontSize: 14,
              height: 1.5,
            ),
          ),
        ).animate().fadeIn(delay: 700.ms),
        const SizedBox(height: 32),
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text(
                'Save Evidence',
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                  color: Colors.white,
                ),
              ),
            ),
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
                      'Share Report',
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
                  child: TextButton(
                    onPressed: () => ref.read(deepfakeProvider.notifier).reset(),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                    ),
                    child: const Text(
                      'Scan Another',
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontFamily: 'Poppins',
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ).animate().fadeIn(delay: 900.ms).slideY(begin: 0.1),
      ],
    );
  }

  Widget _buildBreakdownGrid() {
    final factors = [
      {'label': 'Face inconsistency', 'value': 82},
      {'label': 'Lighting artifacts', 'value': 67},
      {'label': 'Blinking patterns', 'value': 91},
      {'label': 'Background', 'value': 45},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 2.5,
      ),
      itemCount: factors.length,
      itemBuilder: (context, index) {
        final factor = factors[index];
        final value = factor['value'] as int;
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.surfaceLight),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                factor['label'] as String,
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontFamily: 'Poppins',
                  fontSize: 12,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  Expanded(
                    child: LinearProgressIndicator(
                      value: value / 100,
                      backgroundColor: AppColors.surfaceLight,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        value > 80 ? AppColors.danger : 
                        value > 60 ? AppColors.warning : AppColors.success,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '$value%',
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontFamily: 'Poppins',
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
