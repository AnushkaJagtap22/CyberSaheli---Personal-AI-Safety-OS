import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';

/// Main app shell that wraps the bottom navigation tabs.
/// Uses GoRouter's ShellRoute so child pages are rendered inside this scaffold.
class MainShell extends StatefulWidget {
  final Widget child;
  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  late AnimationController _sosController;

  // Route paths for each tab
  static const List<String> _tabRoutes = ['/', '/scan', '/safety', '/reports', '/profile'];

  // Navigation items config
  static const List<_NavItem> _navItems = [
    _NavItem(icon: Icons.home_rounded, label: 'Home'),
    _NavItem(icon: Icons.search_rounded, label: 'Scan'),
    _NavItem(icon: Icons.health_and_safety_rounded, label: 'Safety'),
    _NavItem(icon: Icons.bar_chart_rounded, label: 'Reports'),
    _NavItem(icon: Icons.person_rounded, label: 'Profile'),
  ];

  @override
  void initState() {
    super.initState();
    _sosController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _sosController.dispose();
    super.dispose();
  }

  void _onTabTap(int index) {
    if (index == _currentIndex) return;
    setState(() => _currentIndex = index);
    context.go(_tabRoutes[index]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F0F1A),
      body: widget.child,
      floatingActionButton: _buildSOSButton(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: _buildNavBar(),
    );
  }

  Widget _buildSOSButton() {
    return AnimatedBuilder(
      animation: _sosController,
      builder: (context, child) {
        final scale = 1.0 + (_sosController.value * 0.08);
        return Transform.scale(
          scale: scale,
          child: child,
        );
      },
      child: GestureDetector(
        onTap: () => context.push('/sos'),
        child: Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              colors: [Color(0xFFFF4757), Color(0xFFFF6B7A)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFFF4757).withOpacity(0.5),
                blurRadius: 16,
                spreadRadius: 2,
              ),
            ],
          ),
          child: const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.emergency_share_rounded, color: Colors.white, size: 22),
              SizedBox(height: 2),
              Text(
                'SOS',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.2,
                ),
              ),
            ],
          ),
        ),
      ).animate().fadeIn(duration: 600.ms).scale(delay: 300.ms),
    );
  }

  Widget _buildNavBar() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A2E),
        border: Border(
          top: BorderSide(
            color: Colors.white.withOpacity(0.08),
            width: 1,
          ),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            children: [
              // First 2 tabs
              ..._buildNavItems(0, 2),
              // Center SOS spacer
              const SizedBox(width: 64),
              // Last 2 tabs
              ..._buildNavItems(3, 5),
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> _buildNavItems(int start, int end) {
    return List.generate(end - start, (i) {
      final index = start + i;
      final item = _navItems[index];
      final isActive = _currentIndex == index;
      return Expanded(
        child: GestureDetector(
          onTap: () => _onTabTap(index),
          behavior: HitTestBehavior.opaque,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeOutCubic,
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 250),
                  padding: EdgeInsets.symmetric(
                    horizontal: isActive ? 16 : 0,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: isActive
                        ? const Color(0xFF6C63FF).withOpacity(0.2)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Icon(
                    item.icon,
                    color: isActive
                        ? const Color(0xFF6C63FF)
                        : const Color(0xFF8888A5),
                    size: 24,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  item.label,
                  style: TextStyle(
                    color: isActive
                        ? const Color(0xFF6C63FF)
                        : const Color(0xFF8888A5),
                    fontSize: 11,
                    fontWeight:
                        isActive ? FontWeight.w600 : FontWeight.normal,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    });
  }
}

class _NavItem {
  final IconData icon;
  final String label;
  const _NavItem({required this.icon, required this.label});
}
