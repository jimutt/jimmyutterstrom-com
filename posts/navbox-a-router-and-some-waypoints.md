---
title: NavBox - A Router and some waypoints!
slug: navbox-a-router-and-some-waypoints
status: published
date: '2015-08-12T12:04:31.000Z'
metaDescription: null
metaTitle: null
---

So here’s another progress update for my [USV navigation project](http://jimmyutterstrom.com/2015/07/navbox-autonomous-navigation-project/). In the last post I talked about the general structure of the control panel application and I’ve now implemented basic data transfer capabilities for the Info view so that the live data from the PSoC board is being displayed and updated properly. Though I can only read data sent by the PSoC module so I can’t send any commands to the platform yet. That will be fixed later though.

I have also got added a router to the application for switching between the views. I went with the [vue-router](https://github.com/vuejs/vue-router) which is still under development but I managed to get it working quite fast by looking at the provided example. Though I of course needed to do some restructuring of the project but as I was already using a modular approach with Vue.js components it was easy to fix.

When the routing functionality was in place I started working on the waypoint view. It’s perhaps the most important part of the application as it will allow me to assign, edit and delete waypoints for the vessel. For this view I’m using a two column layout where the left column features a list of waypoints as well as it will also contain various alternatives for editing/deleting and restructuring of the waypoints. The right columns features a large Leaflet.js map where all waypoints are displayed. Right now I’m using the default marker icons for all map markers but this will of course be changed. Up to this point I’ve only implemented functionality for adding waypoints (manually or by tapping where to place it on the map) but I want to have full CRUD functionality for the waypoints. To make it clear how the waypoints are connected I’ve also chosen to draw lines between every waypoint to visualize how the vessel will move.

![Waypoint View](https://di2hdke024x80.cloudfront.net/images/NavBox/Screenshot_2015-08-12-13-17-01.png)

There’s still a lot of work to be done on all parts of the application but at least I’m moving forward. I’ve got a lot of more advanced features which I would like to implement but I think that it’s best to first focus on getting the basic parts working and then I can add additional features after I’ve got a working prototype.

When the waypoint system is implemented I will soon need to get the vehicle that will be using the system. I can of course test the basic navigation functionality manually by driving or walking with the system but to design and test the propulsion control it would be nice to have the vehicle that the system is intended to control. I will most likely choose to use a standard RC boat, at least for the first prototype.

Here is a small video clip where I’m demonstrating the app in its current state:

<iframe allowfullscreen="allowfullscreen" frameborder="0" height="315" src="https://www.youtube.com/embed/NxhcPn7nkUY" width="420"></iframe>
