<template>
  <div class="post-listing">
    <g-link :to="post.node.path" v-for="post in orderedPosts" :key="post.node._id">
      <article class="post-summary">
        <h2>
          <g-link :to="post.node.path">{{post.node.title}}</g-link>
        </h2>
        <span class="post-summary__date">{{toDateString(post.node.publishedDate)}}</span>
        <p>
          <span v-html="summary(post.node.content)"></span>
          <g-link :to="post.node.path" class="post-summary__more">[Read More]</g-link>
        </p>
      </article>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  methods: {
    toDateString(date) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return new Date(date).toLocaleString("en-us", options);
    },
    summary(postContent) {
      return postContent.replace(/<(?:.|\n)*?>/gm, "").substring(0, 280) + " ";
    }
  },
  computed: {
    orderedPosts() {
      return this.posts.sort(
        (a, b) =>
          new Date(b.node.publishedDate) - new Date(a.node.publishedDate)
      );
    }
  }
};
</script>

<style lang="scss">
.post-listing {
  .post-summary {
    margin: 20px 0;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    padding: 20px;
    transition: all 0.2s ease-in-out;
    color: #323233;

    &:hover {
      box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
        0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12) !important;
    }

    h2 {
      margin-top: 0;
    }
  }
}

.post-summary {
  h2 {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  a {
    color: #222;

    &:hover {
      color: #666;
    }
  }

  p {
    margin-top: 10px;
  }

  &__date {
    font-style: italic;
    color: #777;
    font-size: 0.9rem;
  }

  &__more {
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>

