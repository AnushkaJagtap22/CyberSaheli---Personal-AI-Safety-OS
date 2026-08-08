import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingItem> _pages = [
    OnboardingItem(
      title: 'Your AI Cyber Guardian',
      subtitle: 'Stay protected from deepfakes, phishing, online scams, and cyber harassment',
      icon: Icons.shield_outlined,
    ),
    OnboardingItem(
      title: 'AI That Fights For You',
      subtitle: 'Advanced machine learning detects deepfakes, analyzes chats, and identifies threats in real-time',
      icon: Icons.psychology_outlined,
    ),
    OnboardingItem(
      title: 'Your Data, Your Control',
      subtitle: 'All analysis happens securely. Evidence is encrypted locally. Zero data sharing without your consent.',
      icon: Icons.lock_outline,
    ),
    OnboardingItem(
      title: 'One Tap Emergency',
      subtitle: 'Silent SOS, trusted contacts, live location sharing — all at your fingertips when you need it most',
      icon: Icons.sos_outlined,
    ),
    OnboardingItem(
      title: 'Ready to Stay Safe?',
      subtitle: 'Join CyberSaheli and take control of your digital safety today.',
      icon: Icons.verified_user_outlined,
      isLast: true,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: SafeArea(
        child: Column(
          children: [
            // Skip button
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: () => context.go('/login'),
                child: const Text(
                  'Skip',
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    color: Color(0xFFB8B8D0),
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            // PageView
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                },
                itemCount: _pages.length,
                itemBuilder: (context, index) {
                  return _buildPage(_pages[index]);
                },
              ),
            ),
            // Bottom Controls
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  // Dot Indicators
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _pages.length,
                      (index) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        height: 8,
                        width: _currentPage == index ? 24 : 8,
                        decoration: BoxDecoration(
                          color: _currentPage == index
                              ? const Color(0xFF6C63FF)
                              : const Color(0xFF252542),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                  // Navigation Buttons
                  if (!_pages[_currentPage].isLast)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        if (_currentPage > 0)
                          IconButton(
                            onPressed: _previousPage,
                            icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
                          )
                        else
                          const SizedBox(width: 48),
                        ElevatedButton(
                          onPressed: _nextPage,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF6C63FF),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(24),
                            ),
                          ),
                          child: const Text(
                            'Next',
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ],
                    )
                  else
                    Column(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(24),
                              gradient: const LinearGradient(
                                colors: [Color(0xFF6C63FF), Color(0xFF8B85FF)],
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: const Color(0xFF6C63FF).withOpacity(0.3),
                                  blurRadius: 12,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: ElevatedButton(
                              onPressed: () => context.go('/login'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                shadowColor: Colors.transparent,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(24),
                                ),
                              ),
                              child: const Text(
                                'Create Account',
                                style: TextStyle(
                                  fontFamily: 'Poppins',
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        SizedBox(
                          width: double.infinity,
                          child: OutlinedButton(
                            onPressed: () => context.go('/login'),
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFF6C63FF), width: 2),
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(24),
                              ),
                            ),
                            child: const Text(
                              'Sign In',
                              style: TextStyle(
                                fontFamily: 'Poppins',
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ).animate().fade().slideY(begin: 0.2, end: 0),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPage(OnboardingItem item) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Illustration Area
          Expanded(
            child: Center(
              child: Container(
                padding: const EdgeInsets.all(40),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      const Color(0xFF6C63FF).withOpacity(0.2),
                      const Color(0xFF1E1E32).withOpacity(0.5),
                    ],
                  ),
                  border: Border.all(
                    color: const Color(0xFF6C63FF).withOpacity(0.3),
                    width: 2,
                  ),
                ),
                child: Icon(
                  item.icon,
                  size: 100,
                  color: const Color(0xFF6C63FF),
                ),
              ).animate().scale(delay: 200.ms, duration: 500.ms).fadeIn(),
            ),
          ),
          // Content Area
          Expanded(
            child: Column(
              children: [
                const SizedBox(height: 32),
                Text(
                  item.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ).animate().slideY(begin: 0.3, end: 0, delay: 300.ms).fade(),
                const SizedBox(height: 16),
                Text(
                  item.subtitle,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    color: Color(0xFFB8B8D0),
                    height: 1.5,
                  ),
                ).animate().slideY(begin: 0.3, end: 0, delay: 400.ms).fade(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardingItem {
  final String title;
  final String subtitle;
  final IconData icon;
  final bool isLast;

  OnboardingItem({
    required this.title,
    required this.subtitle,
    required this.icon,
    this.isLast = false,
  });
}
