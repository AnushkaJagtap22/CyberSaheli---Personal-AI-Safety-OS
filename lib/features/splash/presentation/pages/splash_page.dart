import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(
        parent: _pulseController,
        curve: Curves.easeInOut,
      ),
    );

    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        context.go('/onboarding');
      }
    });
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Stack(
              alignment: Alignment.center,
              children: [
                // Pulse rings
                ...List.generate(3, (index) {
                  return ScaleTransition(
                    scale: _pulseAnimation,
                    child: Container(
                      width: 100.0 + (index * 30),
                      height: 100.0 + (index * 30),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: const Color(0xFF6C63FF).withOpacity(0.2 - (index * 0.05)),
                          width: 2,
                        ),
                      ),
                    ),
                  );
                }),
                // Shield Icon
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF6C63FF).withOpacity(0.5),
                        blurRadius: 30,
                        spreadRadius: 5,
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.security_rounded,
                    size: 80,
                    color: Colors.white,
                  ),
                ).animate().fade(duration: 600.ms).scale(duration: 600.ms),
              ],
            ),
            const SizedBox(height: 40),
            // Title
            const Text(
              'CyberSaheli',
              style: TextStyle(
                fontFamily: 'Poppins',
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ).animate().slideY(begin: 0.5, end: 0, delay: 400.ms).fade(delay: 400.ms),
            const SizedBox(height: 10),
            // Tagline
            const Text(
              'Your AI Cyber Guardian',
              style: TextStyle(
                fontFamily: 'Poppins',
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Color(0xFF6C63FF),
              ),
            ).animate().fade(delay: 700.ms),
          ],
        ),
      ),
    );
  }
}
