<template>
  <Layout>
    <article class="post">
      <h1>{{$page.post.title}}</h1>
      <span class="post-summary__date">{{toDateString($page.post.publishedDate)}}</span>
      <p v-html="$page.post.content"></p>
    </article>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    content
    publishedDate
  }
}
</page-query>

<script>
export default {
  methods: {
    toDateString(date) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return new Date(date).toLocaleString("en-us", options);
    }
  },
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  }
};
</script>