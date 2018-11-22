<template>
  <Layout>
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
    <h1>Latest posts</h1>
    <hr>
    <PostListing/>
    <!-- <div
        class="blog-post"
        v-for="edge in $page.allPost.edges"
        :key="edge.node._id"
        v-html="edge.node.content"
    ></div>-->
    <div class="pagination">
      <a class="pagination__link-newer" href="">Newer posts</a>
      <a class="pagination__link-older" href="">Older posts</a>
    </div>
  </Layout>
</template>

<script>
import PostListing from '~/components/PostListing.vue'
export default {
  components: {
    PostListing
  }
}
</script>

<style lang="scss">
.pagination {
  &__link-newer,
  &__link-older {
    font-size: 1.1rem;
    padding: 5px;
  }

  &__link-newer {
    &::before {
      content: '\2190 ';
    }
  }

  &__link-older {
    float: right;

    &::after {
      content: ' \2192';
    }
  }
}
</style>
