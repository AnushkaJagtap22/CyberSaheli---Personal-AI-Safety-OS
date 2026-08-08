import 'package:flutter/material.dart';

extension BuildContextExtensions on BuildContext {
  double get screenWidth => MediaQuery.of(this).size.width;
  double get screenHeight => MediaQuery.of(this).size.height;
}

extension StringExtensions on String {
  String capitalize() {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }
}

extension DateTimeExtensions on DateTime {
  String timeAgo() {
    final now = DateTime.now();
    final difference = now.difference(this);

    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} years ago';
    } else if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} months ago';
    } else if (difference.inDays > 0) {
      return '${difference.inDays} days ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} hours ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} mins ago';
    } else {
      return 'Just now';
    }
  }
}

extension DoubleExtensions on double {
  String toConfidenceString() {
    return '${(this * 100).clamp(0, 100).toStringAsFixed(0)}%';
  }
}

extension IntExtensions on int {
  String toSafetyScore() {
    if (this >= 80) return 'Excellent';
    if (this >= 60) return 'Good';
    if (this >= 40) return 'Fair';
    return 'Poor';
  }
}
