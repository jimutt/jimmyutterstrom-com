<template>
  <Layout>
    <h1>About me</h1>
    <g-image src="~/images/jimmy.jpg" class="avatar-image" :immediate="true"/>

    <p>Jimmy Utterström is a Swedish software developer. After finishing his education in electronics and computer technology at Umeå University he started working with full stack web development in the energy industry. This blog is mainly dedicated to his personal projects in electronics and programming.</p>

    <p>
      <strong>Contact Details</strong>
      <br>Email: jimmy@utterstrom.xyz
      <br>Twitter:
      <a href="https://twitter.com/jimutt">https://twitter.com/jimutt</a>
    </p>
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

