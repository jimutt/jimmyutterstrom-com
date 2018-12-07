<template>
  <Layout>
    <div class="author-intro">
      <g-image src="~/images/jimmy.jpg" :immediate="true"/>
      <p>Welcome to the personal site of a Swedish software developer with a passion for singing, web development and embedded systems!</p>
      <p>
        Scroll down to read my latest blog posts or
        <a href="#">click here</a> for more information about me.
      </p>
    </div>
    <h1>Blog</h1>
    <p
      class="blog-disclaimer"
    >Ever since I started working there haven't been much activity around here unfortunately... But who knows, one day that might change!</p>
    <PostListing :posts="$page.allPost.edges"/>
    <g-link class="pagination__link-older" to="/blog/2">Older posts →</g-link>
  </Layout>
</template>

<page-query>
  query Posts ($page: Int) {
    allPost (perPage: 5, page: $page, sortBy: "publishedDate", order: DESC) @paginate {
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

<style scoped lang="scss">
.author-intro {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;

  p {
    max-width: 500px;
  }

  img {
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
}

.blog-disclaimer {
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
}
</style>


