import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_text_styles.dart';

enum InputType {
  text,
  email,
  password,
  phone,
  number,
  url,
  multiline,
  search,
}

class CustomInput extends StatefulWidget {
  final String? label;
  final String? hint;
  final String? initialValue;
  final TextEditingController? controller;
  final InputType type;
  final int? maxLines;
  final int? maxLength;
  final bool isEnabled;
  final bool isRequired;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final VoidCallback? onSuffixIconTap;
  final String? Function(String?)? validator;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;
  final List<TextInputFormatter>? inputFormatters;
  final TextInputType? keyboardType;
  final TextCapitalization textCapitalization;
  
  const CustomInput({
    super.key,
    this.label,
    this.hint,
    this.initialValue,
    this.controller,
    this.type = InputType.text,
    this.maxLines,
    this.maxLength,
    this.isEnabled = true,
    this.isRequired = false,
    this.prefixIcon,
    this.suffixIcon,
    this.onSuffixIconTap,
    this.validator,
    this.onChanged,
    this.onSubmitted,
    this.inputFormatters,
    this.keyboardType,
    this.textCapitalization = TextCapitalization.sentences,
  });

  @override
  State<CustomInput> createState() => _CustomInputState();
}

class _CustomInputState extends State<CustomInput> {
  late bool _obscureText;
  late TextEditingController _controller;
  
  @override
  void initState() {
    super.initState();
    _obscureText = widget.type == InputType.password;
    _controller = widget.controller ?? TextEditingController(text: widget.initialValue);
  }
  
  @override
  void dispose() {
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null) ...[
          Row(
            children: [
              Text(
                widget.label!,
                style: AppTextStyles.inputLabel,
              ),
              if (widget.isRequired) ...[
                const SizedBox(width: 4),
                Text(
                  '*',
                  style: AppTextStyles.inputLabel.copyWith(
                    color: AppColors.danger,
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 8),
        ],
        TextFormField(
          controller: _controller,
          enabled: widget.isEnabled,
          obscureText: _obscureText,
          maxLines: widget.type == InputType.multiline ? widget.maxLines ?? 5 : 1,
          maxLength: widget.maxLength,
          validator: widget.validator,
          onChanged: widget.onChanged,
          onFieldSubmitted: widget.onSubmitted,
          inputFormatters: widget.inputFormatters ?? _getInputFormatters(),
          keyboardType: widget.keyboardType ?? _getKeyboardType(),
          textCapitalization: widget.textCapitalization,
          style: AppTextStyles.bodyMedium,
          decoration: InputDecoration(
            hintText: widget.hint,
            hintStyle: AppTextStyles.inputHint,
            prefixIcon: widget.prefixIcon != null
                ? Icon(
                    widget.prefixIcon,
                    color: AppColors.textTertiary,
                  )
                : null,
            suffixIcon: _buildSuffixIcon(),
          ),
        ),
      ],
    );
  }
  
  Widget? _buildSuffixIcon() {
    if (widget.type == InputType.password) {
      return IconButton(
        icon: Icon(
          _obscureText ? Icons.visibility_off : Icons.visibility,
          color: AppColors.textTertiary,
        ),
        onPressed: () {
          setState(() {
            _obscureText = !_obscureText;
          });
        },
      );
    }
    
    if (widget.suffixIcon != null) {
      return IconButton(
        icon: Icon(
          widget.suffixIcon,
          color: AppColors.textTertiary,
        ),
        onPressed: widget.onSuffixIconTap,
      );
    }
    
    return null;
  }
  
  TextInputType _getKeyboardType() {
    switch (widget.type) {
      case InputType.email:
        return TextInputType.emailAddress;
      case InputType.phone:
        return TextInputType.phone;
      case InputType.number:
        return TextInputType.number;
      case InputType.url:
        return TextInputType.url;
      case InputType.multiline:
        return TextInputType.multiline;
      default:
        return TextInputType.text;
    }
  }
  
  List<TextInputFormatter> _getInputFormatters() {
    switch (widget.type) {
      case InputType.phone:
        return [
          FilteringTextInputFormatter.digitsOnly,
          LengthLimitingTextInputFormatter(10),
        ];
      case InputType.number:
        return [
          FilteringTextInputFormatter.digitsOnly,
        ];
      default:
        return [];
    }
  }
}

class CustomSearchInput extends StatelessWidget {
  final String hint;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;
  final VoidCallback? onClear;
  final TextEditingController? controller;
  
  const CustomSearchInput({
    super.key,
    this.hint = 'Search...',
    this.onChanged,
    this.onSubmitted,
    this.onClear,
    this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(12),
      ),
      child: TextField(
        controller: controller,
        onChanged: onChanged,
        onSubmitted: onSubmitted,
        style: AppTextStyles.bodyMedium,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: AppTextStyles.inputHint,
          prefixIcon: const Icon(
            Icons.search,
            color: AppColors.textTertiary,
          ),
          suffixIcon: controller != null && controller!.text.isNotEmpty
              ? IconButton(
                  icon: const Icon(
                    Icons.clear,
                    color: AppColors.textTertiary,
                  ),
                  onPressed: onClear,
                )
              : null,
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 12,
          ),
        ),
      ),
    );
  }
}
