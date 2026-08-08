import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_text_styles.dart';

enum ButtonType {
  primary,
  secondary,
  outline,
  text,
  danger,
  success,
}

enum ButtonSize {
  small,
  medium,
  large,
}

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonType type;
  final ButtonSize size;
  final bool isLoading;
  final bool isFullWidth;
  final Widget? icon;
  final Widget? leading;
  final Color? customColor;
  
  const CustomButton({
    super.key,
    required this.text,
    this.onPressed,
    this.type = ButtonType.primary,
    this.size = ButtonSize.medium,
    this.isLoading = false,
    this.isFullWidth = false,
    this.icon,
    this.leading,
    this.customColor,
  });

  @override
  Widget build(BuildContext context) {
    final isDisabled = onPressed == null || isLoading;
    
    Widget button;
    
    switch (type) {
      case ButtonType.primary:
        button = _buildPrimaryButton(isDisabled);
        break;
      case ButtonType.secondary:
        button = _buildSecondaryButton(isDisabled);
        break;
      case ButtonType.outline:
        button = _buildOutlineButton(isDisabled);
        break;
      case ButtonType.text:
        button = _buildTextButton(isDisabled);
        break;
      case ButtonType.danger:
        button = _buildDangerButton(isDisabled);
        break;
      case ButtonType.success:
        button = _buildSuccessButton(isDisabled);
        break;
    }
    
    if (isFullWidth) {
      return SizedBox(
        width: double.infinity,
        child: button,
      );
    }
    
    return button;
  }
  
  Widget _buildPrimaryButton(bool isDisabled) {
    return ElevatedButton(
      onPressed: isDisabled ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: customColor ?? AppColors.primary,
        foregroundColor: Colors.white,
        disabledBackgroundColor: AppColors.buttonDisabled,
        elevation: 4,
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildSecondaryButton(bool isDisabled) {
    return ElevatedButton(
      onPressed: isDisabled ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: customColor ?? AppColors.secondary,
        foregroundColor: Colors.white,
        disabledBackgroundColor: AppColors.buttonDisabled,
        elevation: 4,
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildOutlineButton(bool isDisabled) {
    return OutlinedButton(
      onPressed: isDisabled ? null : onPressed,
      style: OutlinedButton.styleFrom(
        foregroundColor: customColor ?? AppColors.primary,
        disabledForegroundColor: AppColors.textDisabled,
        side: BorderSide(
          color: isDisabled ? AppColors.buttonDisabled : (customColor ?? AppColors.primary),
          width: 2,
        ),
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildTextButton(bool isDisabled) {
    return TextButton(
      onPressed: isDisabled ? null : onPressed,
      style: TextButton.styleFrom(
        foregroundColor: customColor ?? AppColors.primary,
        disabledForegroundColor: AppColors.textDisabled,
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildDangerButton(bool isDisabled) {
    return ElevatedButton(
      onPressed: isDisabled ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.danger,
        foregroundColor: Colors.white,
        disabledBackgroundColor: AppColors.buttonDisabled,
        elevation: 4,
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildSuccessButton(bool isDisabled) {
    return ElevatedButton(
      onPressed: isDisabled ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.success,
        foregroundColor: Colors.white,
        disabledBackgroundColor: AppColors.buttonDisabled,
        elevation: 4,
        padding: _getPadding(),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: _getTextStyle(),
      ),
      child: _buildButtonContent(),
    );
  }
  
  Widget _buildButtonContent() {
    if (isLoading) {
      return SizedBox(
        height: _getLoadingSize(),
        width: _getLoadingSize(),
        child: const CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
        ),
      );
    }
    
    if (leading != null || icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (leading != null) ...[
            leading!,
            const SizedBox(width: 8),
          ],
          Text(text),
          if (icon != null) ...[
            const SizedBox(width: 8),
            icon!,
          ],
        ],
      );
    }
    
    return Text(text);
  }
  
  EdgeInsetsGeometry _getPadding() {
    switch (size) {
      case ButtonSize.small:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 10);
      case ButtonSize.medium:
        return const EdgeInsets.symmetric(horizontal: 24, vertical: 14);
      case ButtonSize.large:
        return const EdgeInsets.symmetric(horizontal: 32, vertical: 18);
    }
  }
  
  TextStyle _getTextStyle() {
    switch (size) {
      case ButtonSize.small:
        return AppTextStyles.buttonSmall;
      case ButtonSize.medium:
        return AppTextStyles.buttonMedium;
      case ButtonSize.large:
        return AppTextStyles.buttonLarge;
    }
  }
  
  double _getLoadingSize() {
    switch (size) {
      case ButtonSize.small:
        return 16;
      case ButtonSize.medium:
        return 20;
      case ButtonSize.large:
        return 24;
    }
  }
}
