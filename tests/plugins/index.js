// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// const browserify = require('@cypress/browserify-preprocessor');

// const seedDatabase = require('../../server/src/seed');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = (on, config) => {
  // const options = browserify.defaultOptions;
  // // print options to find babelify, it is inside transforms at index 1
  // // and it is [filename, options]
  // const babelOptions = options.browserifyOptions.transform[1][1];
  // babelOptions.global = true;
  // // ignore all modules except files in lodash-es
  // // babelOptions.ignore = [/\/node_modules\/(?!lodash-es\/)/];
  // // if you want to see the final options
  // // console.log('%o', babelOptions)

  // on('file:preprocessor', browserify(options));

  // on('task', {
  //   'seed:db'(data) {
  //     return seedDatabase(data).then(() => data);
  //   },
  // });

  // `config` is the resolved Cypress config
  config.baseUrl = process.env.CLIENT_URL;

  return config;
};
