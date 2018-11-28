---
title: NavBox - Autonomous navigation project
slug: navbox-autonomous-navigation-project
status: published
publishedDate: '2015-07-27T20:01:04.000Z'
metaDescription: null
metaTitle: null
---

Robotics, RC vehicles, rovers and UAV:s are all big interests of mine. I’ve always been into radio controlled vehicles of different types and since a while ago I’ve been thinking about how fun it would be to build a more autonomous vehicle. That’s why I’ve came up with the idea of the current project I’m working on.


## Project NavBox

Well, “NavBox” is just a temporary production title for my project. After all the final prototype will probably look like, well… A box? With some fancy electronics inside. And since it’s supposed to help a vehicle to autonomously navigate why not call it “NavBox”?

### General description

The main goal is to construct an autonomous navigation system that willbe used to make an unmanned vehicle navigate between a number of set waypoints. The system will initially be adapted for unmanned surface vehicles (USV) which is basically meanssome sort of unmanned boat.

Why a boat? Well the main reason why I’m adapting this system for being used on water is for being able to combine it with another project of mine which consists of depth-mapping a local lake for the creation of a complete nautical chart. Using an autonomous system would allow a more energy-effective and quicker way of mapping the lake as a small, electric powered, unmanned boat could be programmed to perform the the mapping sessions. Using a compact navigation system on a small vessel will also provide very good abilities to map even the shallowest parts without risking any damage of the vehicle. With a GPS module for localization in combination with the ability of assigning waypoints for the USV to follow will allow high precision mapping of all required areas.

### Features

**Android-based control panel**

A custom made Android app will be used to control the vessel and for displaying live telemetry data to the user.

**Waypoint navigation**

Through the Android-based GUI the user will be able to assign waypoints which the vessel will then navigate between in the assigned order.

**PSoC 5LP MCU**

The on-board navigation system will be powered and controlled by a very powerful PSoC 5LP board from Cypress Semiconductors. I will either use a custom-made board or the CY8CKIT-059. The reason I’ve chosen PSoC and not an Atmel dev board or some sort opf Arduino-based platform is because I find the Arduino development environment to be lacking on too many points and I do prefer the quick convenienttools and easy to configure GUI components in PSoC Creator over working with an Atmel chip using Atmel Studio.

Right now I’m doing the prototyping on a [FreeSoC2](https://www.sparkfun.com/products/13229) board from Sparkfun though. Mostly because I hadn’t got my CY8CKIT-059 boards yet when I started working on the project.

<div class="wp-caption alignnone" style="width: 560px">![](https://di2hdke024x80.cloudfront.net/images/CY8CKIT-059.jpg)CY8CKIT-059

</div>**Tilt compensated compass**

To determine a reliable heading even if the vehicle is not moving a LSM303 module from Adafruit will be used. It features both a magnetometer and accelerometer which allows for implementing a tilt compensated compass.

![](https://di2hdke024x80.cloudfront.net/images/adafruit_LSM303DLHC.jpg)

**GPS-Module**

There is no way of navigating between waypoints if the vehicle don’t know its position. For this the Adafruit Ultimate GPS board will be used. It sends location data through a serial interface to the main PSoC 5 board.

[![Adafruit Ultimate GPS](https://di2hdke024x80.cloudfront.net/images/adafruitUltimateGPS.jpg)](https://www.adafruit.com/products/746)

**Wireless communication**

To provide a telemetry link and the ability to control the vessel over a greater distance I will be using two Xbee modules. For future versions of the navigation system GPRS communication could be preferable to allow controlling the vessel at greater distances. Though initially the more simple Xbee radio communication will be used. To communicate using the Xbee modules I will need to have a bluetooth module acting as an intermediary between the phone/tablet and the radio module. If I were to use GPRS I would only need a GPRS module for the on-board navigation system. I could then just connect the android device directly to the vessel. Though as I said that will probably be the choice for a later version.

The modules that I am using right now are two XBee Pro 50mW Series 2 modules:

![](https://di2hdke024x80.cloudfront.net/images/xbeeProSer2.jpg)

Together with the Sparkfun Bluetooth Mate Silver:

[![](https://di2hdke024x80.cloudfront.net/images/bluetoothMateSilver.jpg)](https://www.sparkfun.com/products/12576)

**Motor and servo control**

The system will feature PWM outputs for controlling servos and the brushless motor(s) that will be propelling the vehicle. A standard RC brushless ESC will be used to avoid the need of adding custom hardware for the motor control.

### Current state of the project

Well there’s still a quite long way to go until I’ve even got a first prototype for the complete system. Though I’ve implemented most of the basic navigation functionality on the PSoC board so the next step is to implement the Android control panel forcontrolling the navigation system. I will be building it as a native Android app, which is something I’m not too familiar with. Therefore I expect it to take some time before I’m happy with the GUI and control panel features. I’ve earlier been working some with HTML5/javascript based cross-platform solutions but as I will be usingBluetooth quite muchand to get some extra experience I’ll be going for a native app this time.

So far I haven’t got much to show really. A couple of modules on a breadboard aren’t that fun to look at. Though I’ve been outside walking with the current prototypeandletting it guide me to a number of set waypoints just to check that I’ve got the basic navigation right and that the magnetometer readings are accurate. Everything is looking good so far, so after making a basic version of the control panel I will probably upload some images and maybe a video clip showing the progress.

My goal is being able to test the system with a real vehicle (probably an RC-boat) before the lakes around here get all covered by ice. As I live in the northern part of Sweden that time could come pretty fast but I’ve at least have a couple of months left until my preliminary deadline. If I were able to put at least an hour/day on the project I would probably have a working prototype quite fast. But with studies and other activities I’m pretty sure it will take some time. Though I’ll hopefully be ableto give you some status updates on the project a bit now and then.


