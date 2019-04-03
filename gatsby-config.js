const { createMuiTheme } = require('@material-ui/core/styles');

module.exports = {
  siteMetadata: {
    title: `Trello Clone`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: createMuiTheme({
          typography: {
            useNextVariants: true
          }
        })
      }
    }
  ]
};
