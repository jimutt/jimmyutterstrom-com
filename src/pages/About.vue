<template>
  <Layout>
    <h1>About me</h1>

    <p>
      Jimmy Utterström is a Swedish software developer. He is currently working with full stack
      web development at <a href="http://storytel.com">Storytel</a>. Before his position at
      Storytel Jimmy worked with full stack development in the energy sector. He has a bachelor degree
      in electronics engineering / embedded systems from the University of Umeå. 
      This blog is mainly dedicated to his personal projects in electronics and
      programming.
    </p>

    <p>
      <strong>Contact Details</strong>
      <br />Email: jimmy@utterstrom.xyz <br />Twitter:
      <a href="https://twitter.com/jimutt">https://twitter.com/jimutt</a>
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

