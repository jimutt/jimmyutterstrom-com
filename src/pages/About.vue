<template>
  <Layout>
    <h1>About me</h1>

    <p>
      Jimmy Utterström is a Swedish software developer working as a staff software engineer
      at <a href="https://storytel.com">Storytel</a>. He has a bachelor's degree
      in electronics engineering / embedded systems from the University of Umeå.
      This blog is mainly dedicated to his personal projects in electronics and
      programming.
    </p>

    <p>
      Outside of work, Jimmy enjoys birding and bird photography, playing folk music,
      and tinkering with side projects that tend to combine several of those interests.
    </p>

    <p>
      <strong>Contact Details</strong>
      <br />Email: jimmy@utterstrom.xyz
      <br />Bluesky: <a href="https://bsky.app/profile/jimmyutterstrom.com">@jimmyutterstrom.com</a>
    </p>
    <g-image
      src="~/images/jimmy.jpg"
      alt="Jimmy Utterström"
      class="avatar-image"
      :immediate="true"
    />
  </Layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.avatar-image {
  display: block;
  margin: 0 auto;
}
</style>

