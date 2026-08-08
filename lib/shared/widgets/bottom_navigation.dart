import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';

class BottomNavigation extends ConsumerWidget {
  const BottomNavigation({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final location = GoRouterState.of(context).uri.path;

    return Container(
      decoration: BoxDecoration(
        color: AppColors.navBarBackground,
        boxShadow: [
          BoxShadow(
            color: AppColors.shadow,
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                context,
                icon: Icons.home_rounded,
                label: AppStrings.navHome,
                route: '/',
                isSelected: location == '/',
              ),
              _buildNavItem(
                context,
                icon: Icons.document_scanner_rounded,
                label: AppStrings.navScan,
                route: '/scan',
                isSelected: location == '/scan',
              ),
              _buildNavItem(
                context,
                icon: Icons.shield_rounded,
                label: AppStrings.navSafety,
                route: '/safety',
                isSelected: location == '/safety',
              ),
              _buildNavItem(
                context,
                icon: Icons.assessment_rounded,
                label: AppStrings.navReports,
                route: '/reports',
                isSelected: location == '/reports',
              ),
              _buildNavItem(
                context,
                icon: Icons.person_rounded,
                label: AppStrings.navProfile,
                route: '/profile',
                isSelected: location == '/profile',
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required String route,
    required bool isSelected,
  }) {
    return Expanded(
      child: GestureDetector(
        onTap: () {
          context.go(route);
        },
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected
                ? AppColors.navBarActive.withOpacity(0.1)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                color: isSelected
                    ? AppColors.navBarActive
                    : AppColors.navBarInactive,
                size: 24,
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: AppTextStyles.labelSmall.copyWith(
                  color: isSelected
                      ? AppColors.navBarActive
                      : AppColors.navBarInactive,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
