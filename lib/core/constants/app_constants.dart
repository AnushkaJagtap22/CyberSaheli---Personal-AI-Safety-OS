class AppConstants {
  static const String appName = 'CyberSaheli';
  static const String appTagline = 'Your AI Cyber Guardian';
  static const String apiBaseUrl = 'http://localhost:8000/api';
  static const String appVersion = '1.0.0';

  // Storage Keys
  static const String keyOnboardingSeen = 'onboarding_seen';
  static const String keyAuthToken = 'auth_token';
  static const String keyUserData = 'user_data';

  // API Endpoints
  static const String endpointDeepfake = '/analyze/deepfake';
  static const String endpointPhishing = '/analyze/phishing';
  static const String endpointChatAnalysis = '/analyze/chat';
  static const String endpointBackgroundCheck = '/check/background';

  // Lottie Animation Paths
  static const String lottieShield = 'assets/lottie/shield.json';
  static const String lottieScan = 'assets/lottie/scan.json';
  static const String lottieAlert = 'assets/lottie/alert.json';
  static const String lottieSuccess = 'assets/lottie/success.json';

  // Image Asset Paths
  static const String imageLogo = 'assets/images/logo.png';
  static const String imagePlaceholder = 'assets/images/placeholder.png';

  // Supported Languages
  static const List<String> supportedLanguages = [
    'English',
    'Hindi',
    'Marathi',
    'Hinglish',
  ];

  // Max File Sizes (in bytes)
  static const int maxImageSize = 5 * 1024 * 1024; // 5 MB
  static const int maxVideoSize = 20 * 1024 * 1024; // 20 MB

  // Threat Level Strings
  static const String threatSafe = 'Safe';
  static const String threatWarning = 'Warning';
  static const String threatDanger = 'Danger';
  static const String threatCritical = 'Critical';
}
