<template>
  <div class="post-listing">
    <article class="post-summary" v-for="post in $static.allPost.edges" :key="post.node._id">
      <h2>{{post.node.title}}</h2>
      <span class="post-summary__date">{{toDateString(post.node.date)}}</span>
      <p>
        <span v-html="summary(post.node.content)"></span>
        <a href="#" class="post-summary__more">[Read More]</a>
      </p>
    </article>
  </div>
</template>

<static-query>
  query Posts {
    allPost {
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
</static-query>

<script>
export default {
  methods: {
    toDateString(date) {
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(date).toLocaleString('en-us', options)
    },
    summary(postContent) {
      return postContent.replace(/<(?:.|\n)*?>/gm, '').substring(0, 280) + ' '
    }
  }
}
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

