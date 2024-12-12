import 'package:flutter/material.dart';

class DetailPage extends StatelessWidget {
  final Map<String, dynamic> property;

  DetailPage({required this.property});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(property['category'] ?? 'Unknown'),
      ),
      body: Center(
        child: Text("Details of ${property['category']}"),
      ),
    );
  }
}
