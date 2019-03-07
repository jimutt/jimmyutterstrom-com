module.exports = {
  siteName: 'Jimmy Utterström',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        route: '/blog/:year/:month/:day/:slug',
        typeName: 'Post',
        remark: {
          plugins: ['@gridsome/remark-prismjs']
        }
      }
    }
  ]
};
