<template>
  <Layout>
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
    <h1>Latest posts</h1>
    <hr>
    <PostListing :posts="$page.allPost.edges"/>
    <g-link class="pagination__link-older" to="/blog/2">Older posts →</g-link>
  </Layout>
</template>

<page-query>
  query Posts {
    allPost (perPage: 10, page: 1, sortBy: "publishedDate", order: DESC) {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          _id
          title
          content 
          publishedDate
          path
        }
      }
    }
  }
</page-query>

<script>
import PostListing from "~/components/PostListing";

export default {
  components: {
    PostListing
  }
};
</script>

