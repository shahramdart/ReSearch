import 'package:flutter/material.dart';
import 'package:rentnest/Config/theme.dart';

class MyTopic extends StatelessWidget {
  const MyTopic({
    super.key,
    required this.text,
    required this.btnName,
    required this.onTap,
  });
  final String text;
  final String btnName;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              text,
              style: TextStyle(
                fontFamily: "kurdish",
                fontSize: 17,
              ),
            ),
            InkWell(
              onTap: onTap,
              borderRadius: BorderRadius.circular(5),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Text(
                    btnName,
                    style: TextStyle(
                      fontFamily: "kurdish",
                      fontSize: 15,
                      color: RiveAppTheme.accentColor,
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    child: Container(
                      height: 1,
                      width: 100, // Adjust the width as per your need
                      color: RiveAppTheme.accentColor.withOpacity(
                        0.9,
                      ), // Same color as the text
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
