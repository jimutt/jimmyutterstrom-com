<template>
    <Layout>
        <div class="author-intro">
            <g-image
                src="~/images/jimmy.jpg"
                class="avatar-image"
                :immediate="true"
            />
            <p>
                Welcome to the personal site of a Swedish software developer
                with a passion for singing, web development, embedded systems
                and tea!
            </p>
            <p>
                Scroll down to read my latest blog posts or
                <g-link to="/about">click here</g-link> for more information
                about me.
            </p>
        </div>
        <h1>Blog</h1>
        <p class="blog-disclaimer">
            Since I started working there haven't been much activity around here
            unfortunately... But who knows, one day that might change!
        </p>
        <PostListing :posts="$page.allPost.edges" />
        <g-link class="pagination__link-older" to="/blog/2"
            >Older posts →</g-link
        >
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
}

.blog-disclaimer {
    font-size: 0.8rem;
    font-style: italic;
    text-align: center;
}
</style>


