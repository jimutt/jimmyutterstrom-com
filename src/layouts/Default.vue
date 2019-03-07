<template>
  <div class="layout">
    <header class="header">
      <g-link class="nav__link logo" :to="{ name: 'home' }">
        <strong>Jimmy Utterström</strong>
      </g-link>
      <nav class="nav">
        <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
        <g-link class="nav__link" :to="{ name: 'blog' }">Blog</g-link>
        <g-link class="nav__link" :to="{ name: 'about' }">About</g-link>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style lang="scss">
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  background-color: rgba(#f4f6f9, 0.2);
  color: #323233;
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5 {
  color: #383423;
}

h1 {
  text-align: center;
}

a {
  text-decoration: none;
  color: #5171a5;
  transition: all 0.15s ease-in;

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

blockquote {
  border-left: 5px solid #eee;
  color: #888;
  margin-left: 0;
  padding-left: 3rem;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 150px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  height: 80px;

  @media screen and (max-width: 599px) {
    .logo {
      font-size: 1rem;
    }

    .logo,
    .nav {
      display: flex;
      justify-content: center;
      flex-basis: 100%;
    }
  }
}

.nav__link {
  color: #56442d;
  font-weight: bold;
  font-size: 1.25rem;

  &:hover {
    color: #998977;
  }

  &:not(:first-child) {
    margin-left: 30px;
  }
}

.pagination {
  display: flex;
  justify-content: space-between;

  &__link-newer,
  &__link-older {
    font-size: 1.1rem;
    padding: 5px;
    color: #56442d;

    &:hover {
      color: #998977;
    }
  }
}

.avatar-image {
  position: relative;
  border-radius: 50%;
  min-width: 150px;
  min-height: 150px;
  width: 25vw;
  height: 25vw;
  max-width: 250px;
  max-height: 250px;
  background: white;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
