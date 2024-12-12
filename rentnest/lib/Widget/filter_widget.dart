import 'package:flutter/material.dart';
import 'package:rentnest/Config/theme.dart';

class FilterWidget extends StatelessWidget {
  const FilterWidget({
    super.key,
    required this.onTap,
    required this.icon,
  });

  final VoidCallback onTap;
  final String icon;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        height: 50,
        width: 60,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: Colors.white.withOpacity(0.5),
          border: Border.all(
            color: RiveAppTheme.background2.withOpacity(0.2),
            width: 1,
          ),
        ),
        child: Center(
          child: Image.asset(
            icon,
            height: 30,
          ),
        ),
      ),
    );
  }
}
