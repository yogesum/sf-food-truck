// Set default node environment to development
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  /* eslint global-require:0 */

  // Register the Babel require hook
  require('babel-register');
}

// Export the application
exports = module.exports = require('./app');
