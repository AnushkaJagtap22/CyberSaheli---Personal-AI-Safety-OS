import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';

class AppColors {
  static const primary = Color(0xFF6C63FF);
  static const background = Color(0xFF0F0F1A);
  static const surface = Color(0xFF1E1E32);
  static const surfaceLight = Color(0xFF252542);
  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFFB8B8D0);
  static const success = Color(0xFF00D68F);
  static const warning = Color(0xFFFFB84D);
  static const danger = Color(0xFFFF6B6B);
}

class SignupPage extends ConsumerStatefulWidget {
  const SignupPage({super.key});

  @override
  ConsumerState<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends ConsumerState<SignupPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _agreeToTerms = false;

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _submit() async {
    if (_formKey.currentState!.validate() && _agreeToTerms) {
      try {
        await ref.read(authProvider.notifier).signup(
              _nameController.text,
              _emailController.text,
              _phoneController.text,
              _passwordController.text,
            );
        if (mounted) {
          Navigator.of(context).pushNamed('/otp', arguments: _emailController.text);
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Signup Failed: $e'),
              backgroundColor: AppColors.danger,
            ),
          );
        }
      }
    } else if (!_agreeToTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('You must agree to the Terms & Privacy Policy'),
          backgroundColor: AppColors.warning,
        ),
      );
    }
  }

  Widget _buildStrengthIndicator() {
    String pass = _passwordController.text;
    int strength = 0;
    if (pass.length > 5) strength++;
    if (pass.contains(RegExp(r'[A-Z]'))) strength++;
    if (pass.contains(RegExp(r'[0-9]'))) strength++;
    if (pass.contains(RegExp(r'[!@#\$&*~]'))) strength++;

    Color strengthColor = AppColors.danger;
    String strengthText = 'Weak';

    if (strength == 0) {
      return const SizedBox.shrink();
    } else if (strength < 3) {
      strengthColor = AppColors.warning;
      strengthText = 'Medium';
    } else {
      strengthColor = AppColors.success;
      strengthText = 'Strong';
    }

    return Padding(
      padding: const EdgeInsets.only(top: 8.0, left: 4.0),
      child: Row(
        children: [
          Expanded(
            child: Row(
              children: List.generate(3, (index) {
                return Expanded(
                  child: Container(
                    height: 4,
                    margin: const EdgeInsets.symmetric(horizontal: 2),
                    decoration: BoxDecoration(
                      color: index < (strength > 3 ? 3 : strength) ? strengthColor : AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                );
              }),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            strengthText,
            style: TextStyle(color: strengthColor, fontSize: 12, fontFamily: 'Poppins'),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF1A1A2E), AppColors.background],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24.0),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Create Account',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 32),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: AppColors.surface.withOpacity(0.5),
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: Column(
                            children: [
                              TextFormField(
                                controller: _nameController,
                                style: const TextStyle(color: AppColors.textPrimary),
                                decoration: InputDecoration(
                                  hintText: 'Full Name',
                                  hintStyle: const TextStyle(color: AppColors.textSecondary),
                                  prefixIcon: const Icon(Icons.person_outline, color: AppColors.textSecondary),
                                  filled: true,
                                  fillColor: AppColors.surfaceLight,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide: BorderSide.none,
                                  ),
                                ),
                                validator: (value) => value == null || value.isEmpty ? 'Enter your name' : null,
                              ),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _phoneController,
                                style: const TextStyle(color: AppColors.textPrimary),
                                keyboardType: TextInputType.phone,
                                decoration: InputDecoration(
                                  hintText: 'Phone Number',
                                  prefixText: '+91 ',
                                  prefixStyle: const TextStyle(color: AppColors.textPrimary, fontSize: 16),
                                  hintStyle: const TextStyle(color: AppColors.textSecondary),
                                  prefixIcon: const Icon(Icons.phone_outlined, color: AppColors.textSecondary),
                                  filled: true,
                                  fillColor: AppColors.surfaceLight,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide: BorderSide.none,
                                  ),
                                ),
                                validator: (value) => value == null || value.isEmpty ? 'Enter your phone number' : null,
                              ),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _emailController,
                                style: const TextStyle(color: AppColors.textPrimary),
                                keyboardType: TextInputType.emailAddress,
                                decoration: InputDecoration(
                                  hintText: 'Email',
                                  hintStyle: const TextStyle(color: AppColors.textSecondary),
                                  prefixIcon: const Icon(Icons.email_outlined, color: AppColors.textSecondary),
                                  filled: true,
                                  fillColor: AppColors.surfaceLight,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide: BorderSide.none,
                                  ),
                                ),
                                validator: (value) => value == null || value.isEmpty ? 'Enter an email' : null,
                              ),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _passwordController,
                                style: const TextStyle(color: AppColors.textPrimary),
                                obscureText: _obscurePassword,
                                onChanged: (value) => setState(() {}),
                                decoration: InputDecoration(
                                  hintText: 'Password',
                                  hintStyle: const TextStyle(color: AppColors.textSecondary),
                                  prefixIcon: const Icon(Icons.lock_outline, color: AppColors.textSecondary),
                                  suffixIcon: IconButton(
                                    icon: Icon(
                                      _obscurePassword ? Icons.visibility_off : Icons.visibility,
                                      color: AppColors.textSecondary,
                                    ),
                                    onPressed: () {
                                      setState(() {
                                        _obscurePassword = !_obscurePassword;
                                      });
                                    },
                                  ),
                                  filled: true,
                                  fillColor: AppColors.surfaceLight,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide: BorderSide.none,
                                  ),
                                ),
                                validator: (value) => value == null || value.isEmpty ? 'Enter a password' : null,
                              ),
                              if (_passwordController.text.isNotEmpty) _buildStrengthIndicator(),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _confirmPasswordController,
                                style: const TextStyle(color: AppColors.textPrimary),
                                obscureText: _obscureConfirmPassword,
                                decoration: InputDecoration(
                                  hintText: 'Confirm Password',
                                  hintStyle: const TextStyle(color: AppColors.textSecondary),
                                  prefixIcon: const Icon(Icons.lock_outline, color: AppColors.textSecondary),
                                  suffixIcon: IconButton(
                                    icon: Icon(
                                      _obscureConfirmPassword ? Icons.visibility_off : Icons.visibility,
                                      color: AppColors.textSecondary,
                                    ),
                                    onPressed: () {
                                      setState(() {
                                        _obscureConfirmPassword = !_obscureConfirmPassword;
                                      });
                                    },
                                  ),
                                  filled: true,
                                  fillColor: AppColors.surfaceLight,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide: BorderSide.none,
                                  ),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) return 'Confirm your password';
                                  if (value != _passwordController.text) return 'Passwords do not match';
                                  return null;
                                },
                              ),
                              const SizedBox(height: 16),
                              Row(
                                children: [
                                  Checkbox(
                                    value: _agreeToTerms,
                                    onChanged: (value) {
                                      setState(() {
                                        _agreeToTerms = value ?? false;
                                      });
                                    },
                                    activeColor: AppColors.primary,
                                    checkColor: Colors.white,
                                    side: const BorderSide(color: AppColors.textSecondary),
                                  ),
                                  const Expanded(
                                    child: Text(
                                      'I agree to Terms & Privacy Policy',
                                      style: TextStyle(color: AppColors.textSecondary, fontSize: 13, fontFamily: 'Poppins'),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 24),
                              SizedBox(
                                width: double.infinity,
                                height: 56,
                                child: Container(
                                  decoration: BoxDecoration(
                                    gradient: const LinearGradient(
                                      colors: [AppColors.primary, Color(0xFF8E84FF)],
                                    ),
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  child: ElevatedButton(
                                    onPressed: authState.isLoading ? null : _submit,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.transparent,
                                      shadowColor: Colors.transparent,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(16),
                                      ),
                                    ),
                                    child: authState.isLoading
                                        ? const CircularProgressIndicator(color: Colors.white)
                                        : const Text(
                                            'Create Account',
                                            style: TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.white,
                                              fontFamily: 'Poppins',
                                            ),
                                          ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          "Already have an account? ",
                          style: TextStyle(color: AppColors.textSecondary, fontFamily: 'Poppins'),
                        ),
                        GestureDetector(
                          onTap: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            'Sign In',
                            style: TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Poppins',
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
