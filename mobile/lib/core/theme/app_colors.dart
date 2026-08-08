import 'package:flutter/material.dart';

class AppColors {
  // Primary Palette
  static const Color primaryIndigo = Color(0xFF4F46E5);
  static const Color primaryIndigoDark = Color(0xFF3730A3);
  static const Color primaryIndigoLight = Color(0xFF818CF8);

  // Accents & Secondaries
  static const Color electricPurple = Color(0xFF9333EA);
  static const Color cyberBlue = Color(0xFF0EA5E9);

  // Status Colors
  static const Color emeraldSuccess = Color(0xFF10B981);
  static const Color amberWarning = Color(0xFFF59E0B);
  static const Color crimsonDanger = Color(0xFFE11D48);

  // Background & Surface
  static const Color background = Color(0xFF09090B); // Near Black
  static const Color surface = Color(0xFF18181B); // Slightly lighter for cards
  static const Color surfaceHighlight = Color(0xFF27272A);

  // Gradients
  static const LinearGradient premiumGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      primaryIndigo,
      electricPurple,
    ],
  );

  static const LinearGradient surfaceGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF27272A),
      Color(0xFF18181B),
    ],
  );
}
