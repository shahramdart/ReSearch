import 'package:flutter/material.dart';
import 'package:rentnest/Config/theme.dart';

class ListOfAllHouses extends StatelessWidget {
  const ListOfAllHouses({
    super.key,
    required this.house,
    required this.price,
    required this.location,
    required this.area,
    required this.bedroom,
    required this.bathroom,
    this.isTransactions = false,
    required this.image,
  });

  final String house;
  final String image;
  final String price;
  final String location;
  final String area;
  final String bedroom;
  final String bathroom;
  final bool isTransactions;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          height: size.height * .35,
          width: size.width * .95,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
            boxShadow: [
              BoxShadow(
                color: RiveAppTheme.background2.withOpacity(0.1),
                blurRadius: 30,
                offset: Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Container(
                height: size.height * .25,
                width: size.width * .99,
                decoration: BoxDecoration(
                  color: Colors.white,
                  image: DecorationImage(
                    image: NetworkImage(
                      image,
                    ),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(8),
                    topRight: Radius.circular(8),
                  ),
                ),
              ),
              SizedBox(height: 10),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                child: Column(
                  children: [
                    Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "${house}",
                              style: TextStyle(
                                fontFamily: "kurdish",
                                fontSize: 16,
                              ),
                            ),
                            Text(
                              "\$${price}",
                              style: TextStyle(
                                fontFamily: "kurdish",
                                fontSize: 18,
                              ),
                            ),
                          ],
                        ),
                        if (isTransactions)
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text(
                                "(مامەڵەی تێدایە)",
                                style: TextStyle(
                                  fontFamily: "kurdish",
                                  fontSize: 10,
                                ),
                              ),
                            ],
                          ),
                      ],
                    ),
                    SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Image.asset(
                              'assets/icons/address.png',
                              height: 15,
                            ),
                            Text(
                              "${location}",
                              style: TextStyle(
                                fontFamily: "kurdish",
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Image.asset(
                              'assets/icons/area.png',
                              height: 15,
                              color: Colors.grey.shade800,
                            ),
                            Text(
                              "\t m² \t",
                              style: TextStyle(
                                fontFamily: "kurdish",
                              ),
                            ),
                            Text(
                              "${area} \t",
                              style: TextStyle(
                                fontFamily: "kurdish",
                                fontSize: 15,
                              ),
                            ),
                            Image.asset(
                              'assets/icons/bed.png',
                              height: 15,
                              color: Colors.grey.shade800,
                            ),
                            Text(
                              "\t ${bedroom} \t",
                              style: TextStyle(
                                fontFamily: "kurdish",
                              ),
                            ),
                            Image.asset(
                              'assets/icons/bathroom.png',
                              height: 15,
                              color: Colors.grey.shade800,
                            ),
                            Text(
                              "\t ${bathroom} \t",
                              style: TextStyle(
                                fontFamily: "kurdish",
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
