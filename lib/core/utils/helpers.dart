import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Helpers {
  // Format Date
  static String formatDate(DateTime date) {
    return DateFormat('MMM dd, yyyy').format(date);
  }
  
  // Format Time
  static String formatTime(DateTime time) {
    return DateFormat('hh:mm a').format(time);
  }
  
  // Format DateTime
  static String formatDateTime(DateTime dateTime) {
    return DateFormat('MMM dd, yyyy • hh:mm a').format(dateTime);
  }
  
  // Format Relative Time
  static String formatRelativeTime(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);
    
    if (difference.inSeconds < 60) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes} min ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours} hours ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} days ago';
    } else {
      return formatDate(dateTime);
    }
  }
  
  // Format Number
  static String formatNumber(int number) {
    if (number >= 1000000) {
      return '${(number / 1000000).toStringAsFixed(1)}M';
    } else if (number >= 1000) {
      return '${(number / 1000).toStringAsFixed(1)}K';
    }
    return number.toString();
  }
  
  // Format Percentage
  static String formatPercentage(double value) {
    return '${(value * 100).toStringAsFixed(1)}%';
  }
  
  // Format File Size
  static String formatFileSize(int bytes) {
    if (bytes < 1024) {
      return '$bytes B';
    } else if (bytes < 1024 * 1024) {
      return '${(bytes / 1024).toStringAsFixed(1)} KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return '${(bytes / (1024 * 1024)).toStringAsFixed(1)} MB';
    } else {
      return '${(bytes / (1024 * 1024 * 1024)).toStringAsFixed(1)} GB';
    }
  }
  
  // Get Safety Score Color
  static Color getSafetyScoreColor(int score) {
    if (score >= 80) {
      return const Color(0xFF00D68F); // Green
    } else if (score >= 60) {
      return const Color(0xFF00D4FF); // Blue
    } else if (score >= 40) {
      return const Color(0xFFFFB84D); // Orange
    } else {
      return const Color(0xFFFF6B6B); // Red
    }
  }
  
  // Get Threat Level Color
  static Color getThreatLevelColor(String level) {
    switch (level.toLowerCase()) {
      case 'safe':
        return const Color(0xFF00D68F);
      case 'low':
        return const Color(0xFF00D4FF);
      case 'moderate':
        return const Color(0xFFFFB84D);
      case 'high':
        return const Color(0xFFFF6B6B);
      case 'critical':
        return const Color(0xFFFF4757);
      default:
        return const Color(0xFF8888A5);
    }
  }
  
  // Capitalize First Letter
  static String capitalize(String text) {
    if (text.isEmpty) return text;
    return text[0].toUpperCase() + text.substring(1).toLowerCase();
  }
  
  // Capitalize Each Word
  static String capitalizeWords(String text) {
    return text.split(' ')
        .map((word) => capitalize(word))
        .join(' ');
  }
  
  // Truncate Text
  static String truncateText(String text, int maxLength) {
    if (text.length <= maxLength) return text;
    return '${text.substring(0, maxLength)}...';
  }
  
  // Mask Email
  static String maskEmail(String email) {
    final parts = email.split('@');
    if (parts.length != 2) return email;
    
    final name = parts[0];
    final domain = parts[1];
    
    if (name.length <= 2) return email;
    
    final maskedName = '${name[0]}${'*' * (name.length - 2)}${name[name.length - 1]}';
    return '$maskedName@$domain';
  }
  
  // Mask Phone Number
  static String maskPhoneNumber(String phone) {
    if (phone.length != 10) return phone;
    return '${phone.substring(0, 2)}${'*' * 6}${phone.substring(8)}';
  }
  
  // Generate Random String
  static String generateRandomString(int length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    final random = DateTime.now().millisecondsSinceEpoch;
    final sb = StringBuffer();
    
    for (int i = 0; i < length; i++) {
      sb.write(chars[(random + i) % chars.length]);
    }
    
    return sb.toString();
  }
  
  // Parse URL Domain
  static String parseUrlDomain(String url) {
    try {
      final uri = Uri.parse(url);
      return uri.host.replaceFirst('www.', '');
    } catch (e) {
      return url;
    }
  }
  
  // Is Valid URL
  static bool isValidUrl(String url) {
    try {
      final uri = Uri.parse(url);
      return uri.hasScheme && uri.hasAuthority;
    } catch (e) {
      return false;
    }
  }
  
  // Color To Hex
  static String colorToHex(Color color) {
    return '#${color.value.toRadixString(16).substring(2).toUpperCase()}';
  }
  
  // Hex To Color
  static Color? hexToColor(String hex) {
    try {
      return Color(int.parse(hex.replaceFirst('#', '0xFF')));
    } catch (e) {
      return null;
    }
  }
  
  // Debounce Function
  static Function debounce(Function function, Duration delay) {
    Timer? timer;
    
    return () {
      if (timer != null) {
        timer!.cancel();
      }
      timer = Timer(delay, () {
        function();
      });
    };
  }
  
  // Throttle Function
  static Function throttle(Function function, Duration delay) {
    bool isThrottled = false;
    
    return () {
      if (isThrottled) return;
      
      function();
      isThrottled = true;
      
      Future.delayed(delay, () {
        isThrottled = false;
      });
    };
  }
}

class Timer {
  final Duration duration;
  Function? callback;
  
  Timer(this.duration);
  
  void cancel() {
    callback = null;
  }
}
