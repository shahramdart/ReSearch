import 'package:flutter/material.dart';
import 'package:rive/rive.dart';

class TabItem {
  TabItem({
    required this.stateMachine,
    required this.artboard,
    this.status,
  });

  UniqueKey id = UniqueKey(); // Unique identifier for tabs
  String stateMachine;
  String artboard;
  SMIBool? status;

  static List<TabItem> tabItemList = [
    TabItem(stateMachine: "HOME_Interactivity", artboard: "HOME"),
    TabItem(stateMachine: "SEARCH_Interactivity", artboard: "SEARCH"),
    TabItem(stateMachine: "BELL_Interactivity", artboard: "BELL"),
    TabItem(stateMachine: "USER_Interactivity", artboard: "USER"),
  ];
}
