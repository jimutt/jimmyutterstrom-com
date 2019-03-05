---
title: Migrating from WP to Ghost
slug: migrating-from-wp-to-ghost
status: published
publishedDate: '2017-04-14T07:51:00.000Z'
metaDescription: null
metaTitle: null
---

Things look a little different around here now. The reason is that I've been migrating the old Wordpress blog to **Ghost**. It's perhaps not the most well-known blogging/CMS platform around even though it's beginning to get some more traction now.

But **what is there to gain** from it? One might ask. For many people, WP is the holy grail of blogging- and CMS platforms. And many might believe that WP has to be the best choice as everyone else is using it! Well Wordpress is great in many ways (not a personal favorite of mine though). But these are the main reasons why I chose to make the change:

- **Ease of use** - All I need this website to have are some basic, convenient, hassle-free blogging utilities. Ghost is great in this aspect, writing/editing posts are done in a very easy to use markdown editor with a live preview panel. There's no abrasive and malfunctioning WYSIWYG editor which produces the worst possible HTML markup and gives you all kind of weird non-expected results. Ghost instead features a minimalistic and easy to use Markdown editor with a live preview panel.

- **Node + JS** - Ghost is built on top of the Node.js platform. Many people might consider this to be a downside. Personally, I'm nowadays mainly working with full stack JS and ASP.NET development. I very rarely fiddle with PHP any longer, which makes me feel more intrigued with Ghost.

- **Performance** - Well, to be honest I didn't care much about this myself, but as a much more streamlined and minimalistic platform (running on Node.js) Ghost will outperform Wordpress at any time. At least if the official information is to be trusted (https://ghost.org/vs/wordpress/).

- **Change is fun** - We all need some variation in our lives! It's always fun to explore new platforms and technology!

## Moving all the old posts

With Wordpress using a "normal" WYSIWYG editor which turns your input into all kinds of fancy (obscure) HTML you might expect it to be hard keeping all your old WP posts when moving over to the new platform. In some cases it's true, but for most content it's easy and only requires you to install a plugin on the old WP site. The Ghost team has put together a simple utility which exports all your old Wordpress posts to a JSON file which you can easily upload from the "Labs" page in Ghost. There is an official guide available here: https://help.ghost.org/hc/en-us/articles/225093168-Migrating-From-WordPress-to-Ghost

If you're storing your blog post images inside Wordpress you'll need to perform a search and replace operation on the exported Ghost file though, as the path to the default image directory will differ between the two platforms. In my case that wasn't a problem since I'm using Amazon the Cloudfront CDN and S3 storage for delivering media content. Though the editor in Ghost doesn't really support the custom image positioning and scaling I've used on my old blog. So the images in my old posts will sometimes be of incorrect size and position. For me this isn't a very big deal, but if you're running a very media heavy website you might have a hard time with migrating your old posts and making them look the same on Ghost.

## Caveats

One thing to have in mind before choosing Ghost over Wordpress is that Ghost still is in quite early development. There hasn't been a 1.0 release yet and some things probably will change and there are several features which haven't been released yet. Therefore it's probably a wise decision to simply download the current Ghost release, try it out in a separate environment, and then decide whether it's the way you want to go or not.
