---
title: Debugging Svelte apps with the newly released Svelte Devtools
published: true
date: '2019-09-28T15:31:00.000Z'
slug: using-svelte-devtools
metaDescription: The community created Svelte devtools extension allows you to easily inspect and update components from within the browser.
metaTitle: Debugging Svelte apps with the newly released Svelte Devtools
---

A minor nuisance with using Svelte 3 (if you're coming from Vue or React) might be the lack of a browser plugin like Vue devtools, it offers convenient ways to inspect the app's component tree and direct access to component state. 

There is now a [community created devtools extension for Svelte](https://github.com/RedHatter/svelte-devtools), made by [Timothy Johnson](https://github.com/RedHatter), which gives you some of the basic functionality found in similar tools for other frameworks.  

## Installation 
**Firefox** - [Install from the official store](https://addons.mozilla.org/en-US/firefox/addon/svelte-devtools/)
**Chrome** - The extension is, at the time of writing, under review for Chrome so you'll have to manually download a zip package according to the instructions in the Readme: https://github.com/RedHatter/svelte-devtools/blob/master/README.md

## Usage
Svelte Devtools only work with Svelte version 3.12 or greater, so you might want to make sure that you've updated your Svelte NPM dependency.

### 1. Create a new Svelte app and compile it with development mode enabled
If you don't have a custom Svelte 3 project to use you can just go with the basic app template:

```
npx degit sveltejs/template svelte-app
cd svelte-app
npm install

npm run dev
```

### 2. Open the app in Firefox or Chrome, press F12 and select the "Svelte tab"
![Open devtools](https://thepracticaldev.s3.amazonaws.com/i/22m5c8ffgck7w1vm84qt.PNG)

### 3. Inspect state & components and filter what's shown 
![Devtools window](https://thepracticaldev.s3.amazonaws.com/i/8zuzwwpb10vpqghtsnwd.PNG)
In the main panel you can view and inspect all components and the HTML elements they contain. A component's props are shown both in the element/component view and in the state panel to the right. 

Props and state can be updated directly from the devtools:
![Edit state](https://thepracticaldev.s3.amazonaws.com/i/lv1j0knwk763lw7w9ct7.gif)

You can also filter which information you want to be shown, for example if you'd like to hide HTML elements and only show components.
![Filter view](https://thepracticaldev.s3.amazonaws.com/i/drkwerhoqalfyy424srg.gif)


Like what you see? At least make sure to star the repo on GitHub (https://github.com/RedHatter/svelte-devtools) and perhaps check if [RedHatter](https://github.com/RedHatter) wants any help on improving the tool. 

Also check out my earlier post on Svelte: [Boost your legacy apps with Svelte 3 components](https://jimmyutterstrom.com/blog/2019/06/21/svelte-3-components-in-legacy-apps)
