<template>
  <div class="layout">
    <header class="header">
      <strong>Jimmy Utterström</strong>
      <nav class="nav">
        <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
        <g-link class="nav__link" :to="{ name: 'about' }">About</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<style lang="scss">
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  background-color: #f8f8f8;
  color: #323233;
  font-size: 16px;
}

h1 {
  text-align: center;
}

a {
  text-decoration: none;
  color: #5171a5;

  &:hover {
    color: #7b9cd1;
  }
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
