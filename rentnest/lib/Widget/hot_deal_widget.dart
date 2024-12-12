import 'package:flutter/material.dart';

class HotDealHouse extends StatelessWidget {
  const HotDealHouse({
    super.key,
    required this.image,
    required this.price,
    required this.location,
    required this.area,
    required this.bedroom,
    required this.bathroom,
  });

  final String image;
  final String price;
  final String location;
  final String area;
  final String bedroom;
  final String bathroom;


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: size.height * .26,
          width: size.width * .45,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
                child: Image.network(
                  image,
                  fit: BoxFit.cover,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "\$${price}",
                      style: TextStyle(
                        fontFamily: "kurdish",
                        fontSize: 17,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        Image.asset(
                          'assets/icons/address.png',
                          height: 10,
                        ),
                        Text(
                          location,
                          style: TextStyle(
                            fontFamily: "kurdish",
                            fontSize: 12,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
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
                            color: Colors.grey.shade600,
                          ),
                        ),
                        Text(
                          "${area} \t",
                          style: TextStyle(
                            fontFamily: "kurdish",
                            color: Colors.grey.shade600,
                          ),
                        ),
                        Image.asset(
                          'assets/icons/bed.png',
                          height: 15,
                          color: Colors.grey.shade600,
                        ),
                        Text(
                          "\t ${bedroom} \t",
                          style: TextStyle(
                            fontFamily: "kurdish",
                            color: Colors.grey.shade600,
                          ),
                        ),
                        Image.asset(
                          'assets/icons/bathroom.png',
                          height: 15,
                          color: Colors.grey.shade600,
                        ),
                        Text(
                          "\t ${bathroom} \t",
                          style: TextStyle(
                            fontFamily: "kurdish",
                            color: Colors.grey.shade600,
                          ),
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
