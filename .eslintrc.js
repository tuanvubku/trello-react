const path = require('path');

module.exports = {
  extends: ['gatsby-standard'],
  rules: {
    //...
  },
  settings: {
    'import/resolver': {
      alias: [['@', './src']]
    }
  }
};
