
/**
 *
 *  Test configuration file
 *
 *  Defines the configuration for the tests and the existing tests to rin
 *
 * */

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  specs: [
      'tests/test_login_failure.js',
      'tests/test_login_failure_locales.js',
  ]
};
