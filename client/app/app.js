import './app.scss';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngMessages from 'angular-messages';

import { routeConfig } from './app.config';

import AppComponent from './app.component';
import constants from './app.constant';

angular
  .module('foodApp', [
    ngAnimate, ngSanitize, uiRouter, uiBootstrap,
    constants,
  ])
  .component('foodApp', AppComponent)
  .config(routeConfig);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['foodApp'], {
      strictDi: true,
    });
  });
