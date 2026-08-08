import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../features/splash/presentation/pages/splash_page.dart';
import '../features/onboarding/presentation/pages/onboarding_page.dart';
import '../features/auth/presentation/pages/login_page.dart';
import '../features/auth/presentation/pages/signup_page.dart';
import '../features/auth/presentation/pages/otp_page.dart';
import '../features/permissions/presentation/pages/permissions_page.dart';
import '../features/home/presentation/pages/home_page.dart';
import '../features/scan/presentation/pages/scan_page.dart';
import '../features/safety/presentation/pages/safety_page.dart';
import '../features/reports/presentation/pages/reports_page.dart';
import '../features/profile/presentation/pages/profile_page.dart';
import '../features/deepfake/presentation/pages/deepfake_scanner_page.dart';
import '../features/chat_guardian/presentation/pages/chat_guardian_page.dart';
import '../features/phishing/presentation/pages/phishing_shield_page.dart';
import '../features/background_check/presentation/pages/background_check_page.dart';
import '../features/evidence_vault/presentation/pages/evidence_vault_page.dart';
import '../features/sos/presentation/pages/sos_page.dart';
import '../features/cyber_health/presentation/pages/cyber_health_page.dart';
import '../features/ai_assistant/presentation/pages/ai_assistant_page.dart';
import '../features/settings/presentation/pages/settings_page.dart';
import '../shared/widgets/main_shell.dart';

// Router Provider
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    debugLogDiagnostics: false,
    routes: [
      // Splash
      GoRoute(
        path: '/splash',
        name: 'splash',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const SplashPage(),
          transitionsBuilder: (context, animation, secondary, child) =>
              FadeTransition(opacity: animation, child: child),
        ),
      ),

      // Onboarding
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const OnboardingPage(),
          transitionsBuilder: (context, animation, secondary, child) =>
              FadeTransition(opacity: animation, child: child),
        ),
      ),

      // Auth
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/signup',
        name: 'signup',
        builder: (context, state) => const SignupPage(),
      ),
      GoRoute(
        path: '/otp',
        name: 'otp',
        builder: (context, state) {
          final email = state.uri.queryParameters['email'] ?? '';
          return OtpPage(email: email);
        },
      ),

      // Permissions (post-signup flow)
      GoRoute(
        path: '/permissions',
        name: 'permissions',
        builder: (context, state) => const PermissionsPage(),
      ),

      // Main App Shell with Bottom Navigation
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(
            path: '/',
            name: 'home',
            builder: (context, state) => const HomePage(),
          ),
          GoRoute(
            path: '/scan',
            name: 'scan',
            builder: (context, state) => const ScanPage(),
          ),
          GoRoute(
            path: '/safety',
            name: 'safety',
            builder: (context, state) => const SafetyPage(),
          ),
          GoRoute(
            path: '/reports',
            name: 'reports',
            builder: (context, state) => const ReportsPage(),
          ),
          GoRoute(
            path: '/profile',
            name: 'profile',
            builder: (context, state) => const ProfilePage(),
          ),
        ],
      ),

      // Feature Pages (outside shell — full screen)
      GoRoute(
        path: '/deepfake-scanner',
        name: 'deepfake-scanner',
        builder: (context, state) => const DeepfakeScannerPage(),
      ),
      GoRoute(
        path: '/chat-guardian',
        name: 'chat-guardian',
        builder: (context, state) => const ChatGuardianPage(),
      ),
      GoRoute(
        path: '/phishing-shield',
        name: 'phishing-shield',
        builder: (context, state) => const PhishingShieldPage(),
      ),
      GoRoute(
        path: '/background-check',
        name: 'background-check',
        builder: (context, state) => const BackgroundCheckPage(),
      ),
      GoRoute(
        path: '/evidence-vault',
        name: 'evidence-vault',
        builder: (context, state) => const EvidenceVaultPage(),
      ),
      GoRoute(
        path: '/sos',
        name: 'sos',
        pageBuilder: (context, state) => CustomTransitionPage(
          key: state.pageKey,
          child: const SOSPage(),
          transitionsBuilder: (context, animation, secondary, child) =>
              SlideTransition(
            position: Tween<Offset>(
              begin: const Offset(0, 1),
              end: Offset.zero,
            ).animate(CurvedAnimation(
              parent: animation,
              curve: Curves.easeOutCubic,
            )),
            child: child,
          ),
        ),
      ),
      GoRoute(
        path: '/cyber-health',
        name: 'cyber-health',
        builder: (context, state) => const CyberHealthPage(),
      ),
      GoRoute(
        path: '/ai-assistant',
        name: 'ai-assistant',
        builder: (context, state) => const AIAssistantPage(),
      ),
      GoRoute(
        path: '/settings',
        name: 'settings',
        builder: (context, state) => const SettingsPage(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.error_outline_rounded,
              size: 64,
              color: Color(0xFFFF6B6B),
            ),
            const SizedBox(height: 16),
            Text(
              'Page Not Found',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              'The requested page could not be found.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFFB8B8D0),
                  ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go('/'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6C63FF),
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text('Go Home'),
            ),
          ],
        ),
      ),
    ),
  );
});
