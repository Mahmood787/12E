/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: `Lolly`,
        fieldName: `Lollies`,//under this name gql queries will be available
        url: `https://sad-noether-3211be.netlify.app/.netlify/functions/vLolly`,
      },
    },
  ],
}
