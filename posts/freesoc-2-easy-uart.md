---
title: FreeSoC 2 - Easy UART
slug: freesoc-2-easy-uart
status: published
date: '2015-07-06T18:41:59.000Z'
metaDescription: null
metaTitle: null
---

If you’re starting out with the FreeSoc 2 and you’re ready to leave the world of blinking LEDs to start working on more advanced projects you will quite often need to output data from the board to the computer for debug purposesor you’ll maybe want to send instructions to the PSoC board from your PC.

There are actually more than one way of doing this. Either you can implement the serial communication functionality by using the “USBUART” component in PSoC Creator or you could use a standard UART-module. For most projects it doesn’t matter that much which one you choose. But if you go with the “USBUART” component you will need to change some internal clock settings on the FreeSoC board as well as you’ll need to make sure you’re using the right signal levels. Therefore I think that the easiest and most straight-forward way for someone who is very new to PSoC is to use the standard UART component and as you will most likely use it in future projects it will probably be good to know how it works.

In this tutorial you will learn how to create a simple application for the FreeSoC2 board which echoes serial input from a PC back to the computer.

**Step 1. Creating a new project**

Let’s start out by opening PSoC Creator and then choose “File -> New -> Project”. In the popup windows select the proper template for your board. For the FreeSoC 2 you should choose “PSoC 5 LP Design”.

[![c1](https://jimutt.com/jimmyu/wp-content/uploads/2015/07/c1-300x226.jpg)](http://jimutt.com/jimmyu/wp-content/uploads/2015/07/c1.jpg)

**Step 2. Adding the UART component**

Next make sure you’re looking at “TopDesign.cysch”. If not open the file from the workspace explorer. Then write “uart” in the search field of the component catalog window. You should now see the following three components in the list:

[![c2](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c2.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c4.jpg)

For this project we are going to use the “UART [v2.30]” module (the version number might differ depending on which version of the component you have). Drag the UART component to the top design window and then double click it to view the settings. Here we’ll leave most fields with the default settings to keep it as simple as possible but we choose to lower the baud rate from 57600 to 9600. Your UART module’s settings should now look like this:

[![c3](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c31.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c4.jpg)

Now we are done working in the top view. Next we’ll make the physical connections that’s necessary and then finally we’ll add the actual code for communicating with our PC.

**Step 3. Physical connections**

The UART module we just added is typically used to achieve a serial communication link using some of the GPIO pins. In this case we want to be able to transfer our data through the USB interface to our PC to avoid the need of any additional cables and equipment. This can be achieved by connecting the pins (we will later route the pins to the UART module in PSoC Creator) of our newly created UART module to the RX and TX pins of the programmer/debugger circuit.

We’ll choose to use pin P2.0 for RX and P2.1 for TX. Then we connect the two pins to RX/TX pins on the debugger/programmer which is 12.6 (RX) and 12.7 (TX). Note that the RX pin from the PSoC 5LP MCU should be connected to the **TX** pin of the debugger. And the P2.1 TX pin should be connected to the debugger’s **RX** pin (12.6). As shown in the image below (click to enlarge):

[![c4](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c4-1024x575.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c5.jpg)

Now before we move on to the code we’ll first have to make sure to setup the pin routings.

**Step 4. Routing**

To make sure that our UART component uses the right pins (P2.0 & P2.1) we need to open the “EasyUart.cydwr” file in the workspace explorer. Then make sure you’re looking at the “Pins” tab. In the right panel you’ll see the names “RX_1” and “TX_1”. These are the input/output from our UART component. Open the port dropdownlist and select P2[0] for RX and P2[1] for TX.

[![](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c5.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c5.jpg)

Now we’re finally ready to write some code!

**Step 5. Programming**

Now open up your “main.c” file in the “Source Files” folder. Before we begin writing our code let’s build our project (shift+f6 or use the top menu). This updates the API for your projects and enables the auto fill feature for your uart module.

Now we can move on by starting our UART_1 module. This is done using the UART_1_Start() function and your main function should now look like this:

<script src="https://gist.github.com/jimutt/00616ff079b224cbfd1ea804c977fd37.js"></script>

Okay, so now the uart component is initiated. To keep it simple but still verify that both receiving data and transmitting data is working we’ll implement a simple echo function which echoes all the incoming data back to the PC which sent the data. We will implement this functionality in the for loop:

<script src="https://gist.github.com/jimutt/35fba7bdd1ac763a140e3888a9a3ca1f.js"></script>

See the comments in the above code to understand what is going on. Now we’re ready to test our little application! Make sure your board is connected and selected (Debug > Select debug target) and then build and program the application (Ctrl+F5 or Build > Program).

**Step 6. Check if it works!**

Now start your favourite terminal software (I’ll use Putty this time) and connect to the FreeSoC2. If you’re uncertain of which COM port to use open “Device Manager” and display the “Ports (COM & LPT)” list. There you will most likely see a “KitProg USB-UART” device. That’s the one to use!

[![](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c6.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c6.jpg)

Next open Putty and enter the port number and “9600” as baudrate:

[![](https://jimmyutterstrom.com/wp-content/uploads/2015/07/c7.jpg)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/c7.jpg)

Next click “Open” and you should see a blank terminal. If you then write something it should immediately be echoed back to you:

[![](https://jimmyutterstrom.com/wp-content/uploads/2015/07/m1.gif)](http://jimmyutterstrom.com/wp-content/uploads/2015/07/m1.gif)

Well that’s it! This is one method you can use to achieve a serial communication link between your FreeSoC2 board and your PC. Later I might maybe demonstrate how to use the USBUART component as well.
