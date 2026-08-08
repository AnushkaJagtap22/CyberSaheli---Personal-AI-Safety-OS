import 'package:flutter/material.dart';

enum ThreatLevel { safe, warning, danger, critical }

class StatusBadge extends StatelessWidget {
  final ThreatLevel level;

  const StatusBadge({super.key, required this.level});

  Color get _color {
    switch (level) {
      case ThreatLevel.safe:
        return const Color(0xFF00D68F); // Success
      case ThreatLevel.warning:
        return const Color(0xFFFFB84D); // Warning
      case ThreatLevel.danger:
        return const Color(0xFFFF6B6B); // Danger
      case ThreatLevel.critical:
        return const Color(0xFFD32F2F); // Deep Red
    }
  }

  IconData get _icon {
    switch (level) {
      case ThreatLevel.safe:
        return Icons.check_circle_outline;
      case ThreatLevel.warning:
        return Icons.warning_amber_rounded;
      case ThreatLevel.danger:
        return Icons.error_outline;
      case ThreatLevel.critical:
        return Icons.dangerous_outlined;
    }
  }

  String get _text {
    switch (level) {
      case ThreatLevel.safe:
        return 'Safe';
      case ThreatLevel.warning:
        return 'Warning';
      case ThreatLevel.danger:
        return 'Danger';
      case ThreatLevel.critical:
        return 'Critical';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: _color.withOpacity(0.5), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(_icon, color: _color, size: 16),
          const SizedBox(width: 6),
          Text(
            _text,
            style: TextStyle(
              color: _color,
              fontFamily: 'Poppins',
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
