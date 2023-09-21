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
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    /* dhj adds... */
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: `async`,
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        web: [
          {
            // https://fonts.google.com/specimen/Figtree?query=Fig
            // this the closest we can get to Circular Spotify Text
            name: `Figtree`,
            file: `https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap`,
          },
        ],
      },
    },
  ],
};
