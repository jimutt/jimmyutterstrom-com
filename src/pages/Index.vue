<template>
  <Layout>
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
    <h1>Latest posts</h1>
    <hr>
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
    allPost (perPage: 2, page: $page) @paginate {
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
        }
      }
    }
  }
</page-query>

<script>
import PostListing from '~/components/PostListing'
import CustomPager from '~/components/CustomPager'

export default {
  components: {
    CustomPager,
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

  &__link-older {
    float: right;
  }
}
</style>
