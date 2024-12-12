import 'package:flutter/material.dart';
import 'package:rentnest/Config/theme.dart';

class CategoryWidget extends StatelessWidget {
  const CategoryWidget({
    super.key,
    required this.onTap,
    required this.text,
  });

  final VoidCallback onTap;
  final String text;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(13),
      onTap: onTap,
      child: Container(
        height: 45,
        width: 90,
        decoration: BoxDecoration(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(13),
          border: Border.all(
            width: 1,
            color: RiveAppTheme.background2.withOpacity(0.2),
          ),
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
              fontFamily: "kurdish",
              fontSize: 18,
            ),
          ),
        ),
      ),
    );
  }
}
