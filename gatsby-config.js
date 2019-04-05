const { createMuiTheme } = require('@material-ui/core/styles');

let activeEnv = process.env.GATSBY_ENV || process.env.NODE_ENV || 'development';

console.log(`Using environment config: '${activeEnv}'`);

require('dotenv').config({
  path: `.env.${activeEnv}`
});

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
