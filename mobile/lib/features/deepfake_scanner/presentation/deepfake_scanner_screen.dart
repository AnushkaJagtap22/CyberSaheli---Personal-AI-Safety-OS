import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../../shared/widgets/glass_card.dart';

class DeepfakeScannerScreen extends StatefulWidget {
  const DeepfakeScannerScreen({super.key});

  @override
  State<DeepfakeScannerScreen> createState() => _DeepfakeScannerScreenState();
}

class _DeepfakeScannerScreenState extends State<DeepfakeScannerScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isScanning = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _startScan() {
    setState(() {
      _isScanning = true;
    });
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        setState(() {
          _isScanning = false;
        });
        _showResultDialog();
      }
    });
  }

  void _showResultDialog() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.6,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 32),
            Row(
              children: [
                Icon(Icons.warning_amber_rounded, color: Theme.of(context).colorScheme.error, size: 32),
                const SizedBox(width: 16),
                Text(
                  'High Risk Detected',
                  style: Theme.of(context).textTheme.displayMedium?.copyWith(
                    color: Theme.of(context).colorScheme.error,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            GlassCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('AI Confidence Score', style: Theme.of(context).textTheme.bodyMedium),
                  const SizedBox(height: 8),
                  Text('94.2%', style: Theme.of(context).textTheme.displayLarge),
                  const SizedBox(height: 16),
                  Text('Red Flags:', style: Theme.of(context).textTheme.labelLarge),
                  const SizedBox(height: 8),
                  _buildFlagItem('Inconsistent eye blinking patterns'),
                  _buildFlagItem('Synthetic artifacts around jawline'),
                ],
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.error,
                ),
                onPressed: () => Navigator.pop(context),
                child: const Text('Move to Evidence Vault'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFlagItem(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        children: [
          const Icon(Icons.close, color: Colors.redAccent, size: 16),
          const SizedBox(width: 8),
          Expanded(child: Text(text, style: Theme.of(context).textTheme.bodyMedium)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Deepfake Scanner'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(
              child: _isScanning
                  ? AnimatedBuilder(
                      animation: _controller,
                      builder: (_, child) {
                        return Transform.rotate(
                          angle: _controller.value * 2 * math.pi,
                          child: Container(
                            width: 200,
                            height: 200,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: SweepGradient(
                                colors: [
                                  Theme.of(context).colorScheme.primary,
                                  Theme.of(context).colorScheme.secondary,
                                  Theme.of(context).colorScheme.primary,
                                ],
                              ),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(4.0),
                              child: Container(
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Theme.of(context).scaffoldBackgroundColor,
                                ),
                                child: const Icon(Icons.document_scanner, size: 64, color: Colors.white54),
                              ),
                            ),
                          ),
                        );
                      },
                    )
                  : GestureDetector(
                      onTap: _startScan,
                      child: Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Theme.of(context).colorScheme.surface,
                          border: Border.all(color: Colors.white12, width: 2),
                        ),
                        child: const Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.upload_file, size: 64, color: Colors.white70),
                            SizedBox(height: 16),
                            Text('Tap to Scan Media'),
                          ],
                        ),
                      ),
                    ),
            ),
            const SizedBox(height: 48),
            Text(
              _isScanning ? 'Analyzing facial geometry...' : 'Upload an image or video to verify authenticity.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ],
        ),
      ),
    );
  }
}
