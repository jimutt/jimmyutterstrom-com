---
title: PSoC Tutorial - Adafruit LSM303 magnetometer (compass) module
slug: psoc-tutorial-adafruit-lsm303-magnetometer-compass-module
status: published
publishedDate: '2015-07-12T10:04:23.000Z'
metaDescription: null
metaTitle: null
---

If you will ever want to create some sort of navigation system you will most likely want a reliable way to determine which direction your system is pointing at. If the system is moving, a GPS module could be enough to get the current heading. But if you’re standing still or need higher precision a magnetometer is often the way to go. In this tutorial I will therefore show you how to use a magnetometer module from Adafruit together with the FreeSoC2 board to create an application which will give you your current heading. The heading will be sent with the UART component in PSoC Creator to your PC. If you need help with the serial communication [please read my earlier tutorial on the subject](http://jimmyutterstrom.com/2015/07/freesoc-2-easy-uart/).

This tutorial is made for people who already know the basics of the PSoC ecosystem and feel comfortable with the basic features in PSoC Creator. Therefore the instructions may not be on the most basic level but it should still be possible for most people to follow along just fine.

To get as good results as possible when using a magnetometer you need to compensate for the magnetometer’s angle to the ground. That’s why we’ve got an accelerometer in the module as well. But to keep this guide at a basic level (and make the timeframe of writing it fit with my busy life) we will not use the accelerometer readings in this project and we will only work with the X and Y values from the magnetometer. Then I will perhaps make a complimentary tutorial on how to implement tilt compensation later on.


## **Hardware Needed**

[FreeSoC2 (or other PSoC board)](https://www.sparkfun.com/products/13229) :

<div class="wp-caption alignnone" style="width: 610px">![](https://di2hdke024x80.cloudfront.net/images/FreeSoC2.jpg)Source: https://www.sparkfun.com/products/13229

</div>1 [Adafruit LSM303DLHC](http://www.adafruit.com/products/1120) combined accelerometer/magnetometer module:

<div class="wp-caption alignnone" style="width: 610px">![](https://di2hdke024x80.cloudfront.net/images/adafruit_LSM303DLHC.jpg)Source: http://www.adafruit.com/products/1120

</div>You will probably want to have a few jumper wires and a breadboard as well.


## **Introduction/Theory**

*In this section I will describe the basic theory of what we are going to create and how we will use the magnetometer’s output. If you feel like what’s described here is below your current knowledge level just skip to the next part!*

First of all, what is a magnetometer and how can it help us determine which directionwe are pointing at? Well according to Wikipedia *“magnetometers are measurement instruments used for two general purposes: to measure the [magnetization](https://en.wikipedia.org/wiki/Magnetization "Magnetization") of a magnetic material like a [ferromagnet](https://en.wikipedia.org/wiki/Ferromagnet "Ferromagnet"), or to measure the strength and, in some cases, the direction of the [magnetic field](https://en.wikipedia.org/wiki/Magnetic_field "Magnetic field") at a point in space”*.

<div class="wp-caption alignright" style="width: 320px">![](http://www.unc.edu/depts/oceanweb/turtles/geomag.gif)Earth’s magnetic field Source: http://www.unc.edu/depts/oceanweb/turtles/geomag.html

</div>In the case of the LSM303 we can both measure the strength and direction of the magnetic field surrounding the sensor. And as you know a compass needle is drawn towards the earth’s north magnetic pole which is the place where our planet’s magnetic field points vertically downwards. The earth’s magnetic field can be seen in the illustration to the right. In the same way the magnetic force affecting the magnetometer will be largest from the direction of the magnetic north pole if there are no other magnetic fields in the area. From the three axis output values that the LSM303 provides us with we can then calculate in which direction we are heading.

The X, Y and Z output that the accelerometer gives us is specified in [micro-Teslas](https://en.wikipedia.org/wiki/Tesla_(unit)). Lets say that we get the following values:

 x = 130   
 y = 140  
 z = 12  
 (we’re just using some random numbers for now)

To make it as simple as possible let’s assume thatwe’re holding our magnetometer perfectly straight so that we don’t need to compensate for the angle of the module. Then we can look at only the x and y values and use our knowledge of the trigonometric functions to calculate our current heading.

Now let’s use our x- and y-axis to create an imaginary triangle:

![](https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Images/arctanTriangle.png)

If we could only calculate the angleθ we would get our current heading. Luckily the arctangent function is the right tool for that! So using the arctangent funcion with the x- and y-axis we will get this:

![](https://di2hdke024x80.cloudfront.net/images/quicklatex_com-2cd2248b5cf230d5bcb349b7bca0gsa.png)

This means that our current heading is 0.82 radians! Though radians aren’t commonly used when talking about headings so let’s [convert it to degrees](https://en.wikipedia.org/wiki/Radian#Conversion_between_radians_and_degrees). 0.82 radians is approximately 47°. But what if we would get a negative result like -32°? Well that is no problem but normally we specify the heading as a number between 0 – 360. So to convert a negative number to the standard format we will just need to use 360 + {the number}. So in the case where we got -32 it would be:

![](https://di2hdke024x80.cloudfront.net/images/quicklatex_com-e028e882d016ec3d072dd9f90bd90509_l3.png)

For the basic application we aim to create within this tutorial this is all we need to know for now! So let’s move on to the fun parts!


## Step 1. Connecting the hardware

For this tutorial I will be using the FreeSoC2 board but you should be able to follow along just fine with most other PSoC dev kit. What’s most important is that you’ve got the same compass module as me.

The LSM303 breakout module have 8 pins. Though we will only need to use four of them. Two for power and two for the I2C interface. Which pins on your PSoC board you use for the I2C connection does not matter very much as you can use most of the GPIO-pins on PSoC devices for almost any purpose. For now I’ll be using P12[0] for SCL and P12[1] for SDA. Vin on the LSM303 you’ll need to connect a voltage supply between 3 – 5 V. And GNDgoes to ground as you probably already knew.

![](https://s3-eu-west-1.amazonaws.com/jimmyutterstrom.com/tutorials/ShowMyHeading/Images/LSM303_Connection.png)


## Step 2. Adding components in PSoC Creator

 Now we’ll add our I2C and UART component as well as configuring the pin routing.

**Add components:**

<div class="wp-video" style="width: 640px; "><video class="wp-video-shortcode" controls="controls" height="360" id="video-64-1" preload="metadata" width="640"><source src="https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Videos/addComponents.mp4?_=1" type="video/mp4"></source>[https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Videos/addComponents.mp4](https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Videos/addComponents.mp4)</video></div>**Configure routing:**

**  
[![](https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Images/routing.JPG)](https://di2hdke024x80.cloudfront.net/tutorials/ShowMyHeading/Images/routing.JPG)  
**


## Step 3. Programming

When we’ve got the components configured and the routing are setup we can start programming. First we’ll initialize the UART module by adding the following code in the beginning of the main function. Remember that we’re using the same UART setup as in my Easy UART tutorial found [here](http://jimmyutterstrom.com/2015/07/freesoc-2-easy-uart/).

<script src="https://gist.github.com/jimutt/f98a4b9623e63cebf04da0964d8ae36d.js"></script>

We will then define some constants for our project where we will store the addresses of the registers and values we want to write to the LSM303 module. The names are at least somehow self-explanatory and if you want to read more about the specific registers please take a look at the [datasheet for the LSM303DLHC](http://www.adafruit.com/datasheets/LSM303DLHC.PDF). If you want to learn how I2C communication works in general there are plenty of good resources out there. For example [this one](http://www.robot-electronics.co.uk/acatalog/I2C_Tutorial.html).

<script src="https://gist.github.com/jimutt/587989d66d9672f4e01b8c6b8189f9bf.js"></script>

Now when we got our constants wecanstart communicating with the LSM303 module. To do this we’ll first need to send a number of instructions through our I2C interface for enabling the accelerometer (although we will only be working with the magnetometer data in this tutorial) and magnetometer.

This is done by first sending a start command with the “LSM303_I2C_MasterSendStart()” function. This will initialize our communication session and we are then ready to send the data instructions. Before I continue I want to emphasize the fact that there are more then just one way of communicating through I2C in PSoC. In this case I’m only using what I think are the most basic functions:

MasterSendStart() – Initiates communication   
 MasterWriteByte() – Writes one byte to the slave   
 MasterReadByte() – Reads one byte from the slave  
 MasterSendStop() – Closes the communication session

This is to more clearly show what’s going on. Though there are other functions like for example MasterWriteBuf() and MasterReadBuf() that allows you to read/write more than just one byte of data. If you look at the documentation for the I2C component in PSoC creator you will find information for all available functions.

We will begin by creating the function “LSM303_init”for initializing/starting the module. Here we’ll configure a couple of registers so that the LSM303 module will work and behave in a correct way.

<script src="https://gist.github.com/jimutt/ebbaa82a6e0950efc4a2194ecab3f4c2.js"></script>

Now after the module has been initialized we can go ahead with retrieving the output from the magnetometer.As we know that the magnetometer outputs data for the x, y and z axis it would be comfortable to store all three readings at the same place. Therefore I will create a struct and call it “Vector3”: `typedef struct Vector3 { int x; int y; int z; } Vector3;`

Next we will implement a function for reading the magnetometer data from the LSM303. We will call this function LSM303_ReadMag and its implementation is shown below. There are many comments so I think you should be able to follow what’s happening.

<script src="https://gist.github.com/jimutt/6e180e45e2547188bf254bccbfb0480c.js"></script>

We now have everything we need to setup and read data from the module. But as our main goal was to calculate and show our current heading we will need to implement functionality for that as well. For this small example application we will implement this code in the main function. We will use the atan2 function from the math library so first of all you’ll need to add “#include <math.h>”.

Note that you will probably need to add the library to the gcc linker in your project settings as well. To do that please refer to this official guide:[http://www.cypress.com/knowledge-base-article/using-math-functions-psoc-creator-psoc-4-or-psoc-5lp-gcc-compiler-kba93076](http://www.cypress.com/knowledge-base-article/using-math-functions-psoc-creator-psoc-4-or-psoc-5lp-gcc-compiler-kba93076)

After we’ve fetched the math library we will be able run the following code in our main function:

<script src="https://gist.github.com/jimutt/4a6d76cb59f5fc93080c47a15cb9dbce.js"></script>

Don’t forget to include the stdio lib for the sprintf function.


## Step 4. Run it!

 All you need to do now is to build and program the project. Then use your favourite terminal software and open the COM board for your PSoC board. You should then get an output similiar to this:

![](https://s3-eu-west-1.amazonaws.com/jimmyutterstrom.com/tutorials/ShowMyHeading/Images/output.JPG)

**Troubleshooting**

If you’ve done everything right it should work by now. But what if it isn’t?

If you don’t get any output at all you should first check that your UART module is set up correctly. Try printing a string in the beginning of the code before you do anything else to make sure that it’s working correctly. If the serial communication is working but you don’t get any output from the LSM303 module there’s probably something wrong with your I2C communication. Use the debugger in PSoC creator to see where the code halts. If it ends up in a function where it’s waiting for data from the module check that all the physical connections are correct.

If you get some output but it’s just weird numbers and not anything between 0 – 360 check that all I2C commands looks exactly like in my code. And if that doesn’t help you feel free to post a comment with your issue.

To download a complete main.c file with all the above code click **[here](https://s3-eu-west-1.amazonaws.com/jimmyutterstrom.com/tutorials/ShowMyHeading/Files/main.c)**.


