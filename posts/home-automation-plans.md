---
title: Home automation plans
slug: home-automation-plans
status: published
date: '2016-03-08T10:26:44.000Z'
metaDescription: null
metaTitle: null
---

Home automation seems to be a pretty popular topic nowadays. There are many commercial solutions available to choose from, for example the Z-wave line of products. Though I find it quite common that most of these commercial automation products are pretty expensive. You can sometimes pay \$50 for what’s basically a relay and a radio module in a fancy plastic box. Though to be honest many of the commercial systems can of course be quite convenient and easy to use. So I really understand that people still buy them.

Personally I feel like this is a great area to further investigate and elaborate with different IoT technologies within. Which have led me to the current state where I’ve started planning and implementing a custom home automation system to suit my own needs. The goal is to obtain a generic and extensive home automation system to which I can effortlessly connect new devices communicating either over TCP/IP, BLE or (maybe) Zigbee. There will be some protocol conversion interfaces but the main communication bus of the system will be using MQTT. All commands and messages to/from connected peripheral devices will at some time go through the MQTT broker.

Below is an image which displays an overview of the complete system (click it to enlarge it).  
[![Automation system overview](https://di2hdke024x80.cloudfront.net/images/System+overview.png)](https://di2hdke024x80.cloudfront.net/images/System+overview.png)

As shown on the image above the system features a central server which will act as the main communication hub and it will also deliver the web control interface. In my case I’ve been thinking about using a Raspberry Pi 3 for the server as it’s cheap and already supports BLE out of the box. You might be questioning the choice of developing the web back-end in ASP.NET for a target system running Linux. But this is an intentional choice for getting to explore the new cross platform capabilities of ASP.NET 5. Although I’ll most likely be hosting the web system on an external server in the beginning.

At the moment I haven’t started working on the actual implementation very much. I’ve mostly been creating some initial documenation and planning for the MQTT communication and basic structure of the project to keep everything organized. Since earlier I’ve got an MQTT broker running for an automation system I’ve set up for a poison dart frog vivarium of mine. Though I’ll probably need to modify it a bit if I’ll be using the same broker for this project.

I will try to post some updates on this later on when there will be more stuff to show and discuss. I’ll also think about open sourcing everything on Github for people who might be interested in doing a similar project. Until later I would recommend you to take a look at the MQTT protocol which this project will be using quite extensively. Here’s a link to a documenet which will give you a nice overview/introduction to MQTT: [https://www.oasis-open.org/committees/download.php/49205/MQTT-OASIS-Webinar.pdf](https://www.oasis-open.org/committees/download.php/49205/MQTT-OASIS-Webinar.pdf)
