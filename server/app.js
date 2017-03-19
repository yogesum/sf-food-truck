/**
 * Main application file
 */

import express from 'express';
import config from './config/environment';
import http from 'http';

// Setup server
const debug = require('debug')('http');
const app = express();
const server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, () => {
    debug('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
