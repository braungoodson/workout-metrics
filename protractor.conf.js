exports.config = {


  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the configuration file location passed
  // to proractor (in this example conf.js).
  // They may include glob patterns.
  specs: ['test/**/*Suite.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },

  seleniumServerJar: '/Users/braun/Desktop/workout-metrics/node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar'
};