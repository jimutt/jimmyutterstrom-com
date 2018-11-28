<template>
  <div class="post-listing">
    <article class="post-summary" v-for="post in posts" :key="post.node._id">
      <h2>{{post.node.title}}</h2>
      <span class="post-summary__date">{{toDateString(post.node.publishedDate)}}</span>
      <p>
        <span v-html="summary(post.node.content)"></span>
        <g-link :to="post.node.path" class="post-summary__more">[Read More]</g-link>
      </p>
    </article>
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
  }
};
</script>

<style lang="scss">
.post-listing {
  .post-summary {
    margin: 30px 0;
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
    font-size: 1.1rem;
  }
}
</style>

