---
title: Home Automation - DB design and I/O types
slug: home-automation-db-design-and-io-types
status: published
publishedDate: '2016-03-14T11:57:37.000Z'
metaDescription: null
metaTitle: null
---

Read the introduction to my home automation project here if you haven’t already: [http://jimmyutterstrom.com/2016/03/home-automation-plans/](http://jimmyutterstrom.com/2016/03/home-automation-plans/)

The foundation of the home automation system is the MQTT communication interface. As all connected devices will communicate through the MQTT broker (which I will try to cover later). Though most of the automation logic which control when devices should be switched on and off will be contained in the main server. Mainly to make the firmware development for the different devices easier by not needing to handle all the different on/off conditions etc. directly on the peripherals.

That is why the web control panel is one of the most important and fundamental parts for controlling the system. For being able to very easily test the functionality of future devices I’ve decided to first implement the control panel and API backend. To store device information, switch conditions for devices etc. we’ll of course need an underlying database in which we can storeall the data we’ll need to make it all work. Initially I’ll be using a SQL LocalDB instance but later on I might switch to a more suitable database engine for the target server.

Well, what do we need to store then? First of all we want to be able to store information for the different type of devices the system will feature. I’ve decided to support the device types listed below. If you’refamiliar withthe specs for the Z-wave protocol you might notice that it has been a source of inspiration for me.

**Inputs (sensors):**  
**Binary** – Simple “on or off” sensor which can only have a value of 0 or 1.  
**Multilevel** – Can have avarying value andcan choose from many different data types. It can for example send a float with a temperature reading or just a simple 8 bit integer. Though the data type and data unit (degrees celsius, voltage, percentage etc) needs to be specified in the data package when sending data to the broker.

**Outputs:**  
**Binary** – Simple “on or off” switch. Replaces a normal mechanical switch. Can control lights, radiators etc.  
**Multilevel** – PWM output. Value of 0 – 255 where 255 = 100% duty cycle and 0 = 0% duty cycle. Can be used for controling LED’s or electric motors for example.


## Control logic

 For the system to be useful the user needs to be able to set up logic rules and conditions for when a specific output should be enabled. You might for example want to turn on a radiator when the temperature of a specific room sink below a specific temperature. These type of conditions will be configured on the control panel, and in the database they will be stored in a table called “SwitchCondition”. A “SwitchCondition” has two compare values and an “evaluator” which can be for example “more than”, or “less or equal to”. This enables the user to set up conditions to control different outputs. This “SwitchCondition” is then attached to one or more “Actions”. An action decides what should be done (for example turn the lights on) when its condition is true. To enable more complex control conditions an Action may also have more than just one condition. If it has multiple conditions all of the conditions needs to be true in order for the action to trigger. You might have spotted some limitations with the current system. We won’t be able to set up complex conditions like: “if (var1 && var2 || var6 && var8 && var9 || var7)”. This could be achieved by adding an aditional database table and some restructuring, but for the first version of my home automation system I will be going for this slightly simplified version. It could probably also be implemented in software only (that’ll be a somewhat uglier solution though).

Below is an early ERD of the very first database design with the basic tables for handling the automation. It’s currently a quite simplistic design and might not be optimal for an extensive and very advanced control system. Though the main idea is to first create a rather simple system and allow for future expansions. After all my spare time is quite limited.

[![Database ERD](https://di2hdke024x80.cloudfront.net/images/AutomationERD001.png)](https://di2hdke024x80.cloudfront.net/images/AutomationERD1.png)

Foreign key names are not displayed, except for “CmpValue1” and “CmpValue2” which I’ve added just to show that the SwitchCondition table references two different Data entries (not really a normal many to many relation as it might look like).

**Control System** – Will perhaps allow for future additional control systems/servers. Could also be used to make a virtual group of devices for a specific room or similar and assign them to a virtual control system. I’ll see how/if I’ll use this table later on.   
**Io** – A general table storing information of both sensors and outputs. The device’s value i s stored in a separate “data” entry.  
**Data** – Stores input/output values for devices as well as it could be used for holding general user defined variables as its relation to the Io table is optional. I’ll perhaps consider different names for both the Data and Io tables later on though.   
**Scheduler** – Multi functional module used both for daily scheduling and more advanced interval functionality. Start and stop time is defined in seconds from midnight as that is how all devices will keep track of time. It’s full functionality will probably be easier to understand when the control panel interface for it has been made.

Next up an ASP.NET 5 API will be created for working against the first version of the database.


