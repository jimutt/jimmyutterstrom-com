<template>
  <Layout>
    <h1>Blog</h1>
    <PostListing :posts="$page.allPost.edges" />
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
    allPost (perPage: 5, page: $page, sortBy: "date", order: DESC, filter: { status: { eq: "published" }}) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          _id
          title
          content 
          date
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
