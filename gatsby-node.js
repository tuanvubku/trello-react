const path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/board/)) {
    page.matchPath = `/board/*`;

    createPage(page);
  }
};
