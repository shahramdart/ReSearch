// ignore_for_file: unused_local_variable, prefer_const_constructors

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:rentnest/Components/topic_text.dart';
import 'package:rentnest/Config/theme.dart';
import 'package:rentnest/Pages/detail_screen.dart';
import 'package:rentnest/Widget/category_widget.dart';
import 'package:rentnest/Widget/filter_widget.dart';
import 'package:rentnest/Widget/hot_deal_widget.dart';
import 'package:rentnest/Widget/house_card.dart';
import 'package:rentnest/Widget/house_slider_card.dart';
import 'package:rentnest/Widget/list_all_houses.dart';
import 'package:rentnest/Widget/my_textField.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    List<Map<String, dynamic>> property = [
      {
        'id': 1,
        "category": "خانوو",
      },
      {
        'id': 2,
        "category": "باخ",
      },
      {
        'id': 3,
        "category": "ڤێللا",
      },
      {
        'id': 4,
        "category": "شوقە",
      },
      {
        'id': 5,
        "category": "موڵک",
      },
    ];
    List<Map<String, dynamic>> houses = [
      {
        'image':
            'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        "house": 'هسدود',
        "location": 'ماردین، ڕانیە',
        'price': '300,000',
        'area': '250',
        'houseProperty': 'خانوو',
        'type': 'کلاسیک',
        "city": "Ranya",
        "bedroom": '3',
        "bathroom": "2"
      },
      {
        'image':
            'https://static.realting.com/uploads/images/3f1/445e22c2280ba1273ef81a36f446a.webp',
        "house": 'هسدود',
        "location": 'ماردین، ڕانیە',
        'price': '500,000',
        'area': '300',
        'houseProperty': 'ڤێللا',
        'type': 'پیشەسازی',
        "city": "Erbil",
        "bedroom": '3',
        "bathroom": "2"
      },
      {
        'image':
            'https://media.istockphoto.com/id/149360161/photo/manicured-house-and-garden.jpg?s=612x612&w=0&k=20&c=QM7ussZ_9IjiMbUUIusbKmXNRgTYy__C1XpZnQx2BKQ=',
        "house": 'هسدود',
        "location": 'ماردین، ڕانیە',
        'price': '200,000',
        'area': '200',
        'houseProperty': 'باخ',
        'type': 'مۆدێرن',
        "city": "Sulaimany",
        "bedroom": '3',
        "bathroom": "2"
      },
      // Add more properties as needed
    ];
    List<Map<String, dynamic>> hotHouse = [
      {
        'image':
            'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        "house": 'هسدود',
        "location": 'ماردین، ڕانیە',
        'price': '300,000',
        'area': '250',
        'houseProperty': 'خانوو',
        'type': 'کلاسیک',
        "city": "Ranya",
        "bedroom": '3',
        "bathroom": "2"
      },

      {
        'image':
            'https://media.istockphoto.com/id/149360161/photo/manicured-house-and-garden.jpg?s=612x612&w=0&k=20&c=QM7ussZ_9IjiMbUUIusbKmXNRgTYy__C1XpZnQx2BKQ=',
        "house": 'هسدود',
        "location": 'ماردین، ڕانیە',
        'price': '200,000',
        'area': '200',
        'houseProperty': 'باخ',
        'type': 'مۆدێرن',
        "city": "Sulaimany",
        "bedroom": '3',
        "bathroom": "2"
      },
      // Add more properties as needed
    ];
    List<Map<String, dynamic>> villa = [
      {
        'image':
            'https://assets-news.housing.com/news/wp-content/uploads/2022/02/27121904/featured-compressed-67.jpg',
        "house": 'هسدود',
        "location": 'بیتوێن سیتی ڕانیە',
        'price': '100,000',
        'area': '500',
        'houseProperty': 'ڤێللا',
        'type': 'مۆدێرن',
        "city": "Ranya",
        "bedroom": '5',
        "bathroom": "5"
      },

      {
        'image':
            'https://t4.ftcdn.net/jpg/08/30/19/89/360_F_830198948_x9mT7lq4h6ZKEuIRtqHQFfqZAXypJ6RC.jpg',
        "house": 'ڤیللا',
        "location": 'مێرگەپان، دوکان',
        'price': '200,000',
        'area': '400',
        'houseProperty': 'ڤێللا',
        'type': 'مۆدێرن',
        "city": "Sulaimany",
        "bedroom": '5',
        "bathroom": "4"
      },
      // Add more properties as needed
    ];
    TextEditingController searchController = TextEditingController();
    return Scaffold(
      backgroundColor: Colors.white,
      body: Directionality(
        textDirection: TextDirection.rtl,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              //? Header Section
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  MyTextfield(
                    hintText: "گەڕان بۆ شوێن",
                    hintStyle: TextStyle(
                      fontSize: 18,
                      fontFamily: "kurdish",
                    ),
                    icon: "assets/icons/search.png",
                    controller: searchController,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 70, right: 20),
                    child: FilterWidget(
                      onTap: () {},
                      icon: "assets/icons/filter.png",
                    ),
                  ),
                ],
              ),
              // ? category jory xanwakan
              SizedBox(height: 35),
              Container(
                height: 100, // Constrain the height
                child: SingleChildScrollView(
                  scrollDirection:
                      Axis.horizontal, // Enable horizontal scrolling
                  child: Row(
                    mainAxisAlignment:
                        MainAxisAlignment.start, // Align items to the start
                    children: List.generate(
                      property.length,
                      (index) {
                        final propertys =
                            property[index]; // Access each property
                        return Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10), // Add spacing
                          child: CategoryWidget(
                            text: propertys['category'] ??
                                'Unknown', // Use null-aware operator
                            onTap: () {
                              Get.to(
                                () => DetailPage(
                                  property:
                                      propertys, // Pass the entire property map
                                ),
                              );
                            },
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              // ? hot deal
              SizedBox(height: 35),
              Container(
                padding: EdgeInsets.symmetric(vertical: 10),
                height: size.height * .33,
                width: size.width * 1,
                decoration: BoxDecoration(
                  color: Colors.grey.shade200,
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      child: Row(
                        children: [
                          Image.asset('assets/icons/fire.png', height: 15),
                          SizedBox(width: 5),
                          Text(
                            "فرۆشتنی خێرا",
                            style: TextStyle(
                              fontFamily: "kurdish",
                              fontSize: 16,
                              color: const Color.fromARGB(255, 188, 66, 0),
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 10),
                    SingleChildScrollView(
                      scrollDirection:
                          Axis.horizontal, // Enable horizontal scrolling
                      child: Row(
                        mainAxisAlignment:
                            MainAxisAlignment.start, // Align items to the start
                        children: List.generate(
                          hotHouse.length,
                          (index) {
                            final house =
                                hotHouse[index]; // Access each property
                            return Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10), // Add spacing
                              child: HotDealHouse(
                                image: house['image'],
                                price: house['price'],
                                location: house['location'],
                                area: house['area'],
                                bedroom: house['bedroom'],
                                bathroom: house['bathroom'],
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 35),
              // ? HouseCard Villa Carousel Slider,
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: MyTopic(
                    text: "ڤێللاکان", btnName: "بینینی زیاتر", onTap: () {}),
              ),
              SizedBox(height: 35),
              Container(
                child: CarouselSlider.builder(
                  itemCount: villa.length,
                  itemBuilder: (context, index, pageViewIndex) {
                    final house = villa[index];
                    return HouseCard(
                      image: house['image'],
                      favorite: () {},
                      text: house['houseProperty'],
                      locationName: house['location'],
                    );
                  },
                  options: CarouselOptions(
                    height: size.height * .40,
                    autoPlay: true,
                    viewportFraction: 1,
                    autoPlayCurve: Curves.fastOutSlowIn,
                    enlargeCenterPage: true,
                    autoPlayAnimationDuration: Duration(
                      milliseconds: 1000,
                    ),
                    pageSnapping: true,
                  ),
                ),
              ),
              // ? View all

              InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  height: 40,
                  width: size.width * .9,
                  decoration: BoxDecoration(
                    color: RiveAppTheme.backgroundDark.withOpacity(.9),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "زیاتر ببینە",
                        style: TextStyle(
                          fontFamily: "kurdish",
                          fontSize: 18,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(width: 10),
                      Image.asset(
                        'assets/icons/back.png',
                        height: 20,
                        color: Colors.white,
                      ),
                    ],
                  ),
                ),
              ),

              // ? all House ListView
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: MyTopic(
                    text: "موڵکی کرێ", btnName: "بینینی زیاتر", onTap: () {}),
              ),
              SizedBox(height: 35),
              Container(
                height: 430, // Constrain the height
                child: SingleChildScrollView(
                  scrollDirection:
                      Axis.horizontal, // Enable horizontal scrolling
                  child: Row(
                    mainAxisAlignment:
                        MainAxisAlignment.start, // Align items to the start
                    children: List.generate(
                      houses.length,
                      (index) {
                        final house = houses[index]; // Access each property
                        return Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10), // Add spacing
                          child: HouseSliderCard(
                            image: house['image'],
                            onTap: () {},
                            area: house['area'],
                            houseProperty: house['houseProperty'],
                            type: house['type'],
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              // ? List Of All Type of Houses,
              SizedBox(height: 15),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: MyTopic(
                      text: "نوێترین",
                      btnName: "بینینی زیاتر",
                      onTap: () {},
                    ),
                  ),
                  SizedBox(height: 35),
                  ListView.builder(
                    shrinkWrap:
                        true, // Allows the ListView to adapt to its content
                    physics:
                        NeverScrollableScrollPhysics(), // Disables ListView scrolling
                    padding: EdgeInsets.all(10),
                    itemCount: houses.length,
                    itemBuilder: (context, index) {
                      final house = houses[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: ListOfAllHouses(
                          image: house['image'],
                          house: house['house'],
                          price: house['price'],
                          location: house['location'],
                          area: house['area'],
                          bedroom: house['bedroom'],
                          bathroom: house['bathroom'],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
