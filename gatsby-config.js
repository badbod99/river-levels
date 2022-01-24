module.exports = {
  siteMetadata: {
      title: `River Levels`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
  "gatsby-plugin-sharp", "gatsby-remark-images", "gatsby-transformer-sharp", "gatsby-plugin-mdx", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "rivers",
      "path": "./rivers/"
    },
    __key: "rivers"
  }, {
    resolve: "gatsby-plugin-mdx",
    options: {
      gatsbyRemarkPlugins: [{
        resolve: `gatsby-remark-images`,
        options: {
          // It's important to specify the maxWidth (in pixels) of
          // the content container as this plugin uses this as the
          // base for generating different widths of each image.
          maxWidth: 690,
        },
      }]
    }
  }]
};