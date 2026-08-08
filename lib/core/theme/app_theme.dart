import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_text_styles.dart';

class AppTheme {
  // Light Theme
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: const Color(0xFFF5F5FA),
    colorScheme: const ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      surface: Color(0xFFFFFFFF),
      error: AppColors.danger,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: AppColors.textPrimary,
      onError: Colors.white,
    ),
    textTheme: _lightTextTheme,
    appBarTheme: _lightAppBarTheme,
    cardTheme: _lightCardTheme,
    elevatedButtonTheme: _lightElevatedButtonTheme,
    textButtonTheme: _lightTextButtonTheme,
    outlinedButtonTheme: _lightOutlinedButtonTheme,
    inputDecorationTheme: _lightInputDecorationTheme,
    bottomNavigationBarTheme: _lightBottomNavTheme,
    floatingActionButtonTheme: _lightFabTheme,
    dividerTheme: _lightDividerTheme,
  );

  // Dark Theme
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      surface: AppColors.surface,
      error: AppColors.danger,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: AppColors.textPrimary,
      onError: Colors.white,
    ),
    textTheme: _darkTextTheme,
    appBarTheme: _darkAppBarTheme,
    cardTheme: _darkCardTheme,
    elevatedButtonTheme: _darkElevatedButtonTheme,
    textButtonTheme: _darkTextButtonTheme,
    outlinedButtonTheme: _darkOutlinedButtonTheme,
    inputDecorationTheme: _darkInputDecorationTheme,
    bottomNavigationBarTheme: _darkBottomNavTheme,
    floatingActionButtonTheme: _darkFabTheme,
    dividerTheme: _darkDividerTheme,
  );

  // Light Text Theme
  static final TextTheme _lightTextTheme = TextTheme(
    displayLarge: AppTextStyles.headline1.copyWith(color: const Color(0xFF1A1A2E)),
    displayMedium: AppTextStyles.headline2.copyWith(color: const Color(0xFF1A1A2E)),
    displaySmall: AppTextStyles.headline3.copyWith(color: const Color(0xFF1A1A2E)),
    headlineLarge: AppTextStyles.headline4.copyWith(color: const Color(0xFF1A1A2E)),
    headlineMedium: AppTextStyles.headline5.copyWith(color: const Color(0xFF1A1A2E)),
    headlineSmall: AppTextStyles.headline6.copyWith(color: const Color(0xFF1A1A2E)),
    bodyLarge: AppTextStyles.bodyLarge.copyWith(color: const Color(0xFF1A1A2E)),
    bodyMedium: AppTextStyles.bodyMedium.copyWith(color: const Color(0xFF1A1A2E)),
    bodySmall: AppTextStyles.bodySmall.copyWith(color: const Color(0xFF555570)),
    labelLarge: AppTextStyles.labelLarge.copyWith(color: const Color(0xFF1A1A2E)),
    labelMedium: AppTextStyles.labelMedium.copyWith(color: const Color(0xFF555570)),
    labelSmall: AppTextStyles.labelSmall.copyWith(color: const Color(0xFF8888A5)),
  );

  // Dark Text Theme
  static final TextTheme _darkTextTheme = TextTheme(
    displayLarge: AppTextStyles.headline1,
    displayMedium: AppTextStyles.headline2,
    displaySmall: AppTextStyles.headline3,
    headlineLarge: AppTextStyles.headline4,
    headlineMedium: AppTextStyles.headline5,
    headlineSmall: AppTextStyles.headline6,
    bodyLarge: AppTextStyles.bodyLarge,
    bodyMedium: AppTextStyles.bodyMedium,
    bodySmall: AppTextStyles.bodySmall,
    labelLarge: AppTextStyles.labelLarge,
    labelMedium: AppTextStyles.labelMedium,
    labelSmall: AppTextStyles.labelSmall,
  );

  // Light AppBar Theme
  static final AppBarTheme _lightAppBarTheme = AppBarTheme(
    elevation: 0,
    centerTitle: true,
    backgroundColor: Colors.white,
    foregroundColor: const Color(0xFF1A1A2E),
    titleTextStyle: AppTextStyles.headline5.copyWith(color: const Color(0xFF1A1A2E)),
    iconTheme: const IconThemeData(color: Color(0xFF1A1A2E)),
  );

  // Dark AppBar Theme
  static final AppBarTheme _darkAppBarTheme = AppBarTheme(
    elevation: 0,
    centerTitle: true,
    backgroundColor: AppColors.background,
    foregroundColor: AppColors.textPrimary,
    titleTextStyle: AppTextStyles.headline5,
    iconTheme: const IconThemeData(color: AppColors.textPrimary),
  );

  // Light Card Theme
  static final CardTheme _lightCardTheme = CardTheme(
    elevation: 2,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    color: Colors.white,
    shadowColor: AppColors.shadowLight,
  );

  // Dark Card Theme
  static final CardTheme _darkCardTheme = CardTheme(
    elevation: 4,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    color: AppColors.cardBackground,
    shadowColor: AppColors.shadow,
  );

  // Light Elevated Button Theme
  static final ElevatedButtonThemeData _lightElevatedButtonTheme =
      ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: 2,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      textStyle: AppTextStyles.buttonMedium,
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
    ),
  );

  // Dark Elevated Button Theme
  static final ElevatedButtonThemeData _darkElevatedButtonTheme =
      ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: 4,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      textStyle: AppTextStyles.buttonMedium,
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
    ),
  );

  // Light Text Button Theme
  static final TextButtonThemeData _lightTextButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      textStyle: AppTextStyles.buttonMedium,
      foregroundColor: AppColors.primary,
    ),
  );

  // Dark Text Button Theme
  static final TextButtonThemeData _darkTextButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      textStyle: AppTextStyles.buttonMedium,
      foregroundColor: AppColors.primary,
    ),
  );

  // Light Outlined Button Theme
  static final OutlinedButtonThemeData _lightOutlinedButtonTheme =
      OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      textStyle: AppTextStyles.buttonMedium,
      foregroundColor: AppColors.primary,
      side: const BorderSide(color: AppColors.primary, width: 2),
    ),
  );

  // Dark Outlined Button Theme
  static final OutlinedButtonThemeData _darkOutlinedButtonTheme =
      OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      textStyle: AppTextStyles.buttonMedium,
      foregroundColor: AppColors.primary,
      side: const BorderSide(color: AppColors.primary, width: 2),
    ),
  );

  // Light Input Decoration Theme
  static final InputDecorationTheme _lightInputDecorationTheme =
      InputDecorationTheme(
    filled: true,
    fillColor: const Color(0xFFF5F5FA),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.primary, width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.danger),
    ),
    labelStyle: AppTextStyles.inputLabel.copyWith(color: const Color(0xFF555570)),
    hintStyle: AppTextStyles.inputHint.copyWith(color: const Color(0xFF8888A5)),
    errorStyle: AppTextStyles.errorText,
  );

  // Dark Input Decoration Theme
  static final InputDecorationTheme _darkInputDecorationTheme =
      InputDecorationTheme(
    filled: true,
    fillColor: AppColors.inputBackground,
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.inputBorder),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.inputBorder),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.inputFocused, width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.danger),
    ),
    labelStyle: AppTextStyles.inputLabel,
    hintStyle: AppTextStyles.inputHint,
    errorStyle: AppTextStyles.errorText,
  );

  // Light Bottom Navigation Bar Theme
  static final BottomNavigationBarThemeData _lightBottomNavTheme =
      BottomNavigationBarThemeData(
    backgroundColor: Colors.white,
    selectedItemColor: AppColors.primary,
    unselectedItemColor: const Color(0xFF8888A5),
    selectedLabelStyle: AppTextStyles.labelSmall,
    unselectedLabelStyle: AppTextStyles.labelSmall,
    type: BottomNavigationBarType.fixed,
    elevation: 8,
  );

  // Dark Bottom Navigation Bar Theme
  static final BottomNavigationBarThemeData _darkBottomNavTheme =
      BottomNavigationBarThemeData(
    backgroundColor: AppColors.navBarBackground,
    selectedItemColor: AppColors.navBarActive,
    unselectedItemColor: AppColors.navBarInactive,
    selectedLabelStyle: AppTextStyles.labelSmall,
    unselectedLabelStyle: AppTextStyles.labelSmall,
    type: BottomNavigationBarType.fixed,
    elevation: 8,
  );

  // Light FAB Theme
  static final FloatingActionButtonThemeData _lightFabTheme =
      FloatingActionButtonThemeData(
    backgroundColor: AppColors.sosBackground,
    foregroundColor: Colors.white,
    elevation: 4,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  );

  // Dark FAB Theme
  static final FloatingActionButtonThemeData _darkFabTheme =
      FloatingActionButtonThemeData(
    backgroundColor: AppColors.sosBackground,
    foregroundColor: Colors.white,
    elevation: 4,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  );

  // Light Divider Theme
  static final DividerThemeData _lightDividerTheme = DividerThemeData(
    color: const Color(0xFFE0E0E0),
    thickness: 1,
    space: 1,
  );

  // Dark Divider Theme
  static final DividerThemeData _darkDividerTheme = DividerThemeData(
    color: AppColors.divider,
    thickness: 1,
    space: 1,
  );
}
