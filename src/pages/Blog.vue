<template>
  <Layout>
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
    <h1>Blog</h1>
    <PostListing :posts="$page.allPost.edges"/>
    <CustomPager
      :info="$page.allPost.pageInfo"
      :showLinks="true"
      :showNavigation="true"
      prevLabel="← Newer posts"
      prevClass="pagination__link-newer"
      nextLabel="Older posts →"
      nextClass="pagination__link-older"
    />
  </Layout>
</template>

<page-query>
  query Posts ($page: Int) {
    allPost (perPage: 5, page: $page) @paginate {
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
import CustomPager from "~/components/CustomPager";

export default {
  components: {
    CustomPager,
    PostListing
  }
};
</script>

<style lang="scss">
</style>
