---
title: Wifi enabled fish feeder system
slug: wifi-enabled-fish-feeder-system
status: published
publishedDate: '2015-12-14T18:17:45.000Z'
metaDescription: null
metaTitle: null
---

Christmas is approaching and I’ll soon be leaving myapartment for about 14 days to celebrate christmas with my family. Though I’ve got a small fish tank which I don’t really want to take with me. As it’s quite much work involved in emptying the tank and then transporting the fish + the tank safely 300 km to the place where I’ll spend the holidays.

![](http://www.petco.com/assets/product_images/7/720686350106C.jpg)Though this problem can easily be taken care of by purchasing an automatic fish feeder.Since earlier I’ve got an Eheim Autofeeder on which you can manually set up to 4 feeding times every day and it will then take care of feeding the fish during the time you’re away. Even though this device on its own probably would take care of the feeding and run smoothly for the two weeks I’ll be away I felt that it would be nice being able to monitor the system remotely. Which made me put together the system you’ll see in the video below (the control panelis mainly written in swedish though):

<div class="wp-video" style="width: 640px; "><video class="wp-video-shortcode" controls="controls" height="360" id="video-236-3" preload="metadata" width="640"><source src="https://di2hdke024x80.cloudfront.net/videos/fiskmatare.mp4?_=3" type="video/mp4"></source>[https://di2hdke024x80.cloudfront.net/videos/fiskmatare.mp4](https://di2hdke024x80.cloudfront.net/videos/fiskmatare.mp4)</video></div>The complete system consists of:

- Eheim Autofeeder, modifiedto allow me to control it remotely through the feed (“utfodra”) button.
- Juwel automatic feeder – Set to feed the fishes once a day. I’ve connected a wire to themotor control pin on the internal MCU to let me monitor when/if it’s working.
- Particle Photon – Controls the feeders.
- Raspberry Pi 2 –Hosts the web server and runs the web camera server.
- USB Web camera

The “Senast automatisk utfodring” and “Senast manuellt utfodring” timestamps on the website are updated when the fish has been fed. The automatic (“automatisk”) time updates when the Juwel feeder runs and the manual (“manuell”) when you manual feed them with the Eheim.

If you’re wondering why I’m using two feeder devices it’s just to get some extra redundancy. The main idea is that the Juwel feeder should be working on it’s own and as long as it’s functionalI shouldn’t needto do anything. But if it stops working or runs out of food I can step in and manually feed the fish withthe Eheim autofeeder.

Below is a basic overview of the complete system and the technologies used:  
![System Overview](https://s3-eu-west-1.amazonaws.com/jimmyutterstrom.com/images/fish+feeder.png)

You might be thinking that I could run the complete system with only the rPI. And that’s completely right! The only reason I’m using the Photon though is mainly because I just bought it and wanted to use it for something. Actually I came up with the whole project idea when I was thinking about what I could be using the Photon for.

I’ve only been testing the system for a a day or so but it seems to be working pretty good. I might write a bit more about the project later. Perhaps about the modification I’ve done to the feeders and a more in depth description of the system.


