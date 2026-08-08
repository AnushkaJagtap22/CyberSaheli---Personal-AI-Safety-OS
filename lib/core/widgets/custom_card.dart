import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_text_styles.dart';

class CustomCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? width;
  final double? height;
  final Color? backgroundColor;
  final Gradient? gradient;
  final double? elevation;
  final BoxBorder? border;
  final List<BoxShadow>? boxShadow;
  final BorderRadius? borderRadius;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final bool isGlassmorphism;
  
  const CustomCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.width,
    this.height,
    this.backgroundColor,
    this.gradient,
    this.elevation,
    this.border,
    this.boxShadow,
    this.borderRadius,
    this.onTap,
    this.onLongPress,
    this.isGlassmorphism = false,
  });

  @override
  Widget build(BuildContext context) {
    Widget card = Container(
      width: width,
      height: height,
      margin: margin,
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: gradient,
        color: gradient == null
            ? (isGlassmorphism
                ? AppColors.glassBackground
                : (backgroundColor ?? AppColors.cardBackground))
            : null,
        borderRadius: borderRadius ?? BorderRadius.circular(16),
        border: border,
        boxShadow: boxShadow ??
            (isGlassmorphism
                ? [
                    BoxShadow(
                      color: AppColors.shadow,
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: AppColors.shadow,
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ]),
      ),
      child: child,
    );
    
    if (onTap != null || onLongPress != null) {
      card = InkWell(
        onTap: onTap,
        onLongPress: onLongPress,
        borderRadius: borderRadius ?? BorderRadius.circular(16),
        child: card,
      );
    }
    
    return card;
  }
}

class SafetyScoreCard extends StatelessWidget {
  final int score;
  final String? subtitle;
  final VoidCallback? onTap;
  
  const SafetyScoreCard({
    super.key,
    required this.score,
    this.subtitle,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scoreColor = score >= 80
        ? AppColors.safe
        : score >= 60
            ? AppColors.info
            : score >= 40
                ? AppColors.warning
                : AppColors.danger;
    
    return CustomCard(
      onTap: onTap,
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Safety Score',
                style: AppTextStyles.labelMedium,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: scoreColor.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  score >= 80 ? 'Safe' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : 'Risk',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: scoreColor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            score.toString(),
            style: AppTextStyles.safetyScore.copyWith(
              color: scoreColor,
            ),
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 4),
            Text(
              subtitle!,
              style: AppTextStyles.bodySmall,
            ),
          ],
        ],
      ),
    );
  }
}

class ThreatStatusCard extends StatelessWidget {
  final String status;
  final String description;
  final VoidCallback? onTap;
  
  const ThreatStatusCard({
    super.key,
    required this.status,
    required this.description,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final statusColor = status.toLowerCase() == 'safe'
        ? AppColors.safe
        : status.toLowerCase() == 'low'
            ? AppColors.info
            : status.toLowerCase() == 'moderate'
                ? AppColors.warning
                : status.toLowerCase() == 'high'
                    ? AppColors.danger
                    : AppColors.critical;
    
    return CustomCard(
      onTap: onTap,
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(
              color: statusColor,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: statusColor.withOpacity(0.5),
                  blurRadius: 8,
                  spreadRadius: 2,
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  status,
                  style: AppTextStyles.headline6.copyWith(
                    color: statusColor,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: AppTextStyles.bodySmall,
                ),
              ],
            ),
          ),
          Icon(
            Icons.chevron_right,
            color: AppColors.textTertiary,
          ),
        ],
      ),
    );
  }
}

class QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color? iconColor;
  final VoidCallback? onTap;
  
  const QuickActionCard({
    super.key,
    required this.icon,
    required this.label,
    this.iconColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      onTap: onTap,
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: (iconColor ?? AppColors.primary).withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              color: iconColor ?? AppColors.primary,
              size: 24,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            label,
            style: AppTextStyles.labelSmall,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class AlertCard extends StatelessWidget {
  final String title;
  final String message;
  final String time;
  final AlertType type;
  final VoidCallback? onTap;
  final VoidCallback? onDismiss;
  
  const AlertCard({
    super.key,
    required this.title,
    required this.message,
    required this.time,
    required this.type,
    this.onTap,
    this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final typeConfig = _getAlertTypeConfig();
    
    return CustomCard(
      onTap: onTap,
      padding: const EdgeInsets.all(16),
      border: Border.all(
        color: typeConfig.color.withOpacity(0.3),
        width: 1,
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: typeConfig.color.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              typeConfig.icon,
              color: typeConfig.color,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: AppTextStyles.labelMedium,
                ),
                const SizedBox(height: 4),
                Text(
                  message,
                  style: AppTextStyles.bodySmall,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                time,
                style: AppTextStyles.overline,
              ),
              if (onDismiss != null) ...[
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: onDismiss,
                  child: Icon(
                    Icons.close,
                    size: 16,
                    color: AppColors.textTertiary,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
  
  _AlertTypeConfig _getAlertTypeConfig() {
    switch (type) {
      case AlertType.warning:
        return _AlertTypeConfig(
          icon: Icons.warning_amber_rounded,
          color: AppColors.warning,
        );
      case AlertType.danger:
        return _AlertTypeConfig(
          icon: Icons.dangerous_rounded,
          color: AppColors.danger,
        );
      case AlertType.success:
        return _AlertTypeConfig(
          icon: Icons.check_circle_rounded,
          color: AppColors.success,
        );
      case AlertType.info:
        return _AlertTypeConfig(
          icon: Icons.info_rounded,
          color: AppColors.info,
        );
    }
  }
}

class _AlertTypeConfig {
  final IconData icon;
  final Color color;
  
  _AlertTypeConfig({
    required this.icon,
    required this.color,
  });
}

enum AlertType {
  warning,
  danger,
  success,
  info,
}
