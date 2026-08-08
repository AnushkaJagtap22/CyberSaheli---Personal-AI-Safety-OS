import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:async';

class User {
  final String id;
  final String name;
  final String email;
  final String phone;
  final int safetyScore;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.safetyScore,
  });
}

class AuthState {
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;
  final User? user;

  AuthState({
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
    this.user,
  });

  AuthState copyWith({
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
    User? user,
  }) {
    return AuthState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      user: user ?? this.user,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState());

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      await Future.delayed(const Duration(seconds: 2));
      if (email.isEmpty || password.isEmpty) {
        throw Exception("Invalid credentials");
      }
      state = state.copyWith(
        isLoading: false,
        isAuthenticated: true,
        user: User(id: '1', name: 'Test User', email: email, phone: '+919999999999', safetyScore: 100),
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      throw e;
    }
  }

  Future<void> loginWithBiometrics() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      await Future.delayed(const Duration(seconds: 2));
      state = state.copyWith(
        isLoading: false,
        isAuthenticated: true,
        user: User(id: '1', name: 'Biometric User', email: 'bio@example.com', phone: '+919999999999', safetyScore: 100),
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      throw e;
    }
  }

  Future<void> loginWithGoogle() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      await Future.delayed(const Duration(seconds: 2));
      state = state.copyWith(
        isLoading: false,
        isAuthenticated: true,
        user: User(id: '2', name: 'Google User', email: 'google@example.com', phone: '+919999999999', safetyScore: 100),
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      throw e;
    }
  }

  Future<void> signup(String name, String email, String phone, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      await Future.delayed(const Duration(seconds: 2));
      state = state.copyWith(isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      throw e;
    }
  }

  Future<void> verifyOtp(String email, String otp) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      await Future.delayed(const Duration(seconds: 2));
      state = state.copyWith(
        isLoading: false,
        isAuthenticated: true,
        user: User(id: '1', name: 'New User', email: email, phone: '+919999999999', safetyScore: 100),
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      throw e;
    }
  }

  void clearError() {
    if (state.error != null) {
      state = state.copyWith(error: null);
    }
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
