const path = require('path');
const development = require('./development');
const production = require('./production');
const _ = require('lodash');

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 3333,

  // Server IP
  ip: process.env.IP || '0.0.0.0',
};

// Export the config object
// ==============================================
module.exports = {
  development: _.merge(all, development),
  production: _.merge(all, production),
}[process.env.NODE_ENV || 'development'];
