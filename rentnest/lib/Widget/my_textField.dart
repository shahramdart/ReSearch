import 'package:flutter/material.dart';
import 'package:rentnest/Config/theme.dart';

class MyTextfield extends StatelessWidget {
  MyTextfield(
      {super.key,
      required this.hintText,
      required this.hintStyle,
      required this.icon,
      required this.controller});

  final TextEditingController controller;
  final String hintText;
  final TextStyle hintStyle;
  final String icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        top: 70,
      ),
      height: 50,
      width: 310,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        color: Colors.white.withOpacity(0.5),
        border: Border.all(
          color: RiveAppTheme.background2.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(vertical: 15),
          prefixIcon: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 8,
            ),
            child: Image.asset(
              icon,
              height: 30,
            ),
          ),
          hintText: hintText, // Text inside the TextField
          hintStyle: hintStyle,
          border: InputBorder.none,
          filled: true,
          fillColor: Colors.transparent,
        ),
      ),
    );
  }
}
