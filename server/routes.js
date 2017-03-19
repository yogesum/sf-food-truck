/**
 * Main application routes
 */

import path from 'path';
import foodtrucks from './api/foodtrucks';
import errors from './components/errors';

export default function setupRoutes(app) {
  // Insert routes below
  app.use('/api/foodtrucks', foodtrucks);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
