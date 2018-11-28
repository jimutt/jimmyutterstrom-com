---
title: Modbus master
slug: modbus-master
status: published
publishedDate: '2015-11-22T21:11:19.000Z'
metaDescription: null
metaTitle: null
---

A couple of weeks ago we finished the GSM trip computer project with quite positive results. We didn’t really have time to fix the last few bugs and do some final improvements but the live data loggin to the external web server worked well and in general it was a nice project to get to know Atmel ASF and the SAMD21 better.

Now I’ve moved on to a new project where my and my project group consisting of 4 members have been asked to construct a system for controlling up to 100 Modbus slaves. The slave devices are used to control the heat supplies for buses when they’re parked at the bus station. The master device we will be constructingcommunicates over Modbus with up to 100 slaves and is controlled from an external web interface. Following is a basic chart displaying the web stack and communication flow of the application (please excuse the swedish spelling for “slaves” and the web server):



![](https://di2hdke024x80.cloudfront.net/images/Kommunikationsschema+-+Kommunikationsschema+(1).png)

I’ll be in charge of the web interface and therefore I’ll not be working very much with the hardware. The current plan though is to use a Cortex M0+ MCU running FreeRTOS together with the modbus transceiver and the ethernet interface chip which are shown in the above diagram.

I’ve mainly been working with ASP.NET and PHP earlier so I’m looking forward into implementing the web interface with Node.js and Express this time. I’ll be going for a SPA and a standalone REST API. For the communication between the server and the master we’ll opt in for a direct TCP socket connection for quick real-time data transfer.


