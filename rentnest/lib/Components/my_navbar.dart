import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rentnest/Pages/home_screen.dart';
import 'package:rentnest/Pages/notifications_screen.dart';
import 'package:rentnest/Pages/profile_screen.dart';
import 'package:rentnest/Pages/search_screen.dart';
import 'package:rive/rive.dart' hide LinearGradient;
import 'package:rentnest/Config/theme.dart';
import 'package:rentnest/Models/tab_item.dart';

class MyNavbar extends StatefulWidget {
  const MyNavbar({super.key});

  @override
  State<MyNavbar> createState() => _MyNavbarState();
}

class _MyNavbarState extends State<MyNavbar> {
  final List<TabItem> _icons = TabItem.tabItemList;

  int _tabSelect = 0; // Tracks the selected tab
  final List<Widget> _pages = [
    // Add your different pages here
    HomePage(),
    SearchPage(),
    NotificationsPage(),
    ProfilePage(),
  ];

  void _onRiveIconInit(Artboard artboard, int index) {
    final controller = StateMachineController.fromArtboard(
      artboard,
      _icons[index].stateMachine,
    );

    if (controller == null) {
      return; // Gracefully handle missing state machine
    }
    artboard.addController(controller);
    // Initialize the 'active' input
    _icons[index].status = controller.findInput<bool>("active") as SMIBool?;
  }

  void onTabPress(int index) {
    if (_tabSelect != index) {
      setState(() {
        _tabSelect = index;
      });
      if (_icons[index].status != null) {
        _icons[index].status!.change(true);
        Future.delayed(Duration(seconds: 1), () {
          _icons[index].status!.change(false);
        });
      } else {
        print("Status for '${_icons[index].stateMachine}' is null.");
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _pages[_tabSelect], // Displays the selected page content
      ),
      bottomNavigationBar: Container(
        margin: EdgeInsets.fromLTRB(15, 0, 15, 24),
        padding: EdgeInsets.all(1),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: LinearGradient(
            colors: [
              Colors.white.withOpacity(0.5),
              Colors.white.withOpacity(0)
            ],
          ),
        ),
        child: Container(
          clipBehavior: Clip.hardEdge,
          decoration: BoxDecoration(
            color: RiveAppTheme.background2.withOpacity(0.8),
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: RiveAppTheme.background2.withOpacity(0.3),
                blurRadius: 20,
                offset: Offset(0, 20),
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(_icons.length, (index) {
              TabItem icon = _icons[index];
              return Expanded(
                key: icon.id,
                child: CupertinoButton(
                  padding: EdgeInsets.all(12),
                  child: AnimatedOpacity(
                    duration: Duration(milliseconds: 300),
                    opacity: _tabSelect == index ? 1 : 0.5,
                    child: Stack(
                      clipBehavior: Clip.none,
                      alignment: Alignment.center,
                      children: [
                        Positioned(
                          top: -4,
                          child: AnimatedContainer(
                            duration: Duration(milliseconds: 300),
                            height: 4,
                            width: _tabSelect == index ? 20 : 0,
                            decoration: BoxDecoration(
                              color: RiveAppTheme.accentColor,
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 36,
                          width: 36,
                          child: RiveAnimation.asset(
                            'assets/icons/icons.riv',
                            stateMachines: [icon.stateMachine],
                            artboard: icon.artboard,
                            onInit: (artboard) {
                              _onRiveIconInit(artboard, index);
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                  onPressed: () {
                    onTabPress(index);
                  },
                ),
              );
            }),
          ),
        ),
      ),
    );
  }
}
