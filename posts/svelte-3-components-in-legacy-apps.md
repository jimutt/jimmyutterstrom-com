---
title: Boost your legacy apps with Svelte 3 components
status: published
date: '2019-06-21T16:11:00.000Z'
slug: svelte-3-components-in-legacy-apps
metaDescription: Build and distribute Svelte components for convenient use in legacy apps.
metaTitle: Boost your legacy apps with Svelte 3 components
---

There sure has been some well deserved fuzz around [Svelte 3](https://svelte.dev/) lately, but maybe not enough? It's an amazing light-weight framework without a heavy runtime and with very little overhead. This makes it a suitable choice for more than just SPAs and isomorphic web apps. 

Did you know that you can create a Svelte component and with almost no extra steps distribute- and use it like any classic old Javascript library through a global constructor (`let myComponent = new MyComponent()`)? Svelte components by default compiles to standard JavaScript classes so you only need to add an IIFE build with your component. I'll briefly show you how that's done with Rollup and how the component is used. It's not a big difference to the official app starter template (https://github.com/sveltejs/template) but I think it can be easy to miss how convenient Svelte is for distributing and consuming individual components. 

I will use a simple example component of mine to demonstrate. It renders a Leaflet map and lets the user select a position. An event is emitted when the selected location changes (which can be used in order to update a form field for example) and the map allows props for configuring for example initial lat/lng and zoom level. 

The component can be found here: https://github.com/jimutt/svelte-pick-a-place
It can also be installed with npm: `npm install svelte-pick-a-place`

*(the component is primarily created for experimental use and it's simple enough to argue that using Svelte to build might be overkill)*

If you were to use it within a Svelte app it would probably look something like this:

```html
<script>
  import PickAPlace from 'svelte-pick-a-place';
</script>

<PickAPlace leaflet={leaflet} on:update={() => console.log('Update!')} on:save={() =>
console.log('On save!')} />
```

![Screenshot of component](https://thepracticaldev.s3.amazonaws.com/i/5r42c0yhtvwo1uod9o2c.png)

But what if we want to use it in a legacy app built with for example Bootstrap 3 and lots of jQuery where there's no sign of Node.js? No problem! We'll just use the IIFE build and instantiate the component class through its global constructor:

```html
<link rel="stylesheet" href="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.css">
<script src="https://unpkg.com/svelte-pick-a-place@latest/dist/pick-a-place.min.js"></script>
```

```javascript
let pickAPlace = new PickAPlace({
  target: document.getElementById('map'),
  props: {
    leaflet: window.L,
    buttons: false
  }
});

// Listen to events through component.$on('eventName', callback)
pickAPlace.$on('update', ({ detail }) => {
  console.log('New position: ', detail);
  // Here we could for example populate an input field with the new value
});
```

Codepen live demo: https://codepen.io/jimutt/pen/XLjaqV 

As you can see props and events can be easily accessed through the class API. Unfortunately there's not a convenient way to add slot content at the moment though. 


## Build config
For the Pick a place component the production build entry point is the file **src/components/components.module.js**:
```javascript
export { default } from './PickAPlace.svelte';
```

It contains a default export with the PickAPlace component. If you were to export multiple components in the same package and wanted to instantiate them namespaced like `new MyPackageName.Component1()` you could use named exports instead. 

The file is specified as the input for production builds in `rollup.config.js`:
```javascript
//rollup.config.js
input: !production ? 'src/main.js' : 'src/components/components.module.js',
```

In [rollup.config.js](https://github.com/jimutt/svelte-pick-a-place/blob/master/rollup.config.js) we've added several outputs to support multiple ways of consuming the component:
```javascript
//rollup.config.js
output: [
   { file: 'dist/index.min.mjs', format: 'es' },
   { file: 'dist/index.min.js', format: 'umd', name },
   { file: 'dist/pick-a-place.min.js', format: 'iife', name }
]
// "name" is set to PickAPlace
```

As you've probably already figured out it's the last output definition that should be by legacy apps. With the above output configuration we allow consuming the component both from a modern app with a Node.js-based environment and from legacy apps. 

The PickAPlace component was created from this project template and then slightly adapted: https://github.com/YogliB/svelte-component-template

That's all I had to say! Just wanted to post a quick reminder of Svelte's versatility and that it's a great choice for more than just complete web apps!
