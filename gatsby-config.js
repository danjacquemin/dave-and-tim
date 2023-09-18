/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Dave & Tim Swag`,
    description: `Swag!`,
    author: `@danjacquemin`,
    siteUrl: `https://danjacquemin.com/dave-and-tim/`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    /* dhj adds... */
    'gatsby-plugin-postcss',
  ],
};
