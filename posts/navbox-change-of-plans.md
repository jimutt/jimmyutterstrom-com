---
title: NavBox - Change of plans
slug: navbox-change-of-plans
status: published
date: '2015-07-31T19:31:21.000Z'
metaDescription: null
metaTitle: null
---

If you’ve read [my last post](http://jimmyutterstrom.com/2015/07/navbox-autonomous-navigation-project/) about the project you might remember that I was planning to write a make Android app for the system. Though I’m not sure that’s what I’m going to do. I feel that my limited time and my will to make some fast progress on the project is a bit too high for me to dive into native app development in Java right now. Sure, it’s not that hard to learn what I need to make something that works but I’m pretty confident that I will put more time into the project if I go for a solution I feel a bit more comfortable with. Therefore I will most probably design a Javascript app with Cordova instead.

When I’ve earlier been into cross-platform JS app development I’ve mainly been trying cloud-based solutions like Monaca as well as I’ve been checking out the possibilites of Chrome apps. Though there are some downsides with using a cloud development platform like Monaca. If you don’t pay for their services you can’t use their command line tools which means that you’re quite limited if you want to use more advanced development methods involving different preprocessors etc. That’s the reason why I’ve chosen to go for a barebone Cordova approach this time.

I’m developing the app on my Windows PC with Cordova CLI. The available Cordova plugins gives me access to the hardware features I need to use, for example Bluetooth connectivity. Though the Cordova platform does not set any rules of how your application should be structured. And to prevent everything from becoming a giant mess I felt like I needed to use some sort of Javascript framework. This time I’ve chosen to use [Vue.js](http://vuejs.org/).

![](https://di2hdke024x80.cloudfront.net/images/NavBox/vue.PNG)Vue.js is a lightweight (68.32kb minified) Javascript MVVM framework that’s mainly focusing on the ViewModel layer. You might be wondering why I don’t chose to go with a more proven and popular framework like Angular for example. Well, I could do that of course. But when working on smaller projects I often I feel like I don’t need 80% of the stuff Angular provides me with. There are also times when I don’t like how Angular handles different things. In situations like that I would prefer a more simple and customizable framework and that’s where Vue.js enters the scene. Here’s an extract from the FAQ page on the official Vue.js website where the author of the framework explains why he prefers Vue over Angular:

> There are a few reasons to use Vue over Angular, although they might not apply for everyone:
>
> Vue.js is a more flexible, less opinionated solution. That allows you to structure your app the way you want it to be, instead of being forced to do everything the Angular way. It’s only an interface layer so you can use it as a light feature in pages instead of a full blown SPA. It gives you bigger room to mix and match with other libraries, but you are also responsible for making more architectural decisions. For example, Vue.js’ core doesn’t come with routing or ajax functionalities by default, and usually assumes you are building the application using an external module bundler. This is probably the most important distinction.
>
> Vue.js is much simpler than Angular, both in terms of API and design. You can learn almost everything about it really fast and get productive.
>
> Vue.js has better performance because it doesn’t use dirty checking. Angular gets slow when there are a lot of watchers, because every time anything in the scope changes, all these watchers need to be re-evaluated again. Vue.js doesn’t suffer from this because it uses a transparent dependency-tracking observing system – all changes trigger independently unless they have explicit dependency relationships.
>
> Vue.js has a clearer separation between directives and components. Directives are meant to encapsulate DOM manipulations only, while Components stand for a self-contained unit that has its own view and data logic. In Angular there’s a lot of confusion between the two.

Source: [http://vuejs.org/guide/faq.html](http://vuejs.org/guide/faq.html)

Though of course we are all entitled to our own opinions and just because I really like Vue.js does not mean that you necessarily share my view. For smaller projects like this I personally don’t really see why I should chose a framework like Angular over Vue.js though. I’m by the way going for a modular approach with Vue.js. Using the component system in the framework together with [Webpack](https://github.com/webpack/webpack) I can easily separate the different parts of the interface into separate module files. Currently I’m only using one file for each module with the following structure:

 <style> /* CSS HERE */ </style> <template> <!-- HTML HERE --> </template> <script lang="babel"> /* Module logic here */ </script>

Though if needed it’s of course possible split it up in even smaller parts and writing the style and template code in separate files.

To give myself some basic tools for creating the UI I’ve chosen to use the Pure framework. It’s also very lightweight and contains an easy to use grid system for rapid UI prototyping. As this will, at least for now, only be a product that I’ll be using for myself I don’t actually care that much about the UI. It of course needs all the functionality I want but the esthetics aren’t too important to me.

Today I’ve put together a basic UI idea for one of the three main “views” of the application. In this view I will get details about the USV:s position, speed, heading etc. It also contains a small Leaflet map where the vehicle’s position will be displayed as well as the waypoints. Though all the actual data and numbers you see on the image below are just placeholders and there’s very little logic implemented so far.  
[![UI Screenshot](https://di2hdke024x80.cloudfront.net/images/NavBox/Screenshot_2015-07-31-18-51-04.png)](https://di2hdke024x80.cloudfront.net/images/NavBox/Screenshot_2015-07-31-18-51-04.png)

The “Manual Control” view that will be added later will probably contain some controls for sending commands to the vessel. For example to cancel the navigation and make the vehicle drive home or adjusting speed etc. The “Waypoints” view will feature a much bigger map as well as a toolbar for adding/editing and deleting waypoints. Though before I implement those two views I will try to make sure that the communication between the Android device and the PSoC board is working so that I can get some real data for the info view.

I haven’t implemented any routing functionality yet neither. Currently Vue.js does not have any built-in router. Though there is one that’s under development and not fully released yet. An other possibility is to use a stand-alone routing library like Page.js or Director. I’ve not decided for sure how I’ll solve this, I might perhaps first try the [vue-router](https://github.com/vuejs/vue-router) and see if I can get it to work. If not I’ll probably go for a stand-alone routing lib.
