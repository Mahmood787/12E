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
        url: `https://mahmood-12e.netlify.app/.netlify/functions/vLolly`,
      },
    },
  ],
}
