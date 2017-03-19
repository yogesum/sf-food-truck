import './app.scss';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngMessages from 'angular-messages';

import { routeConfig } from './app.config';

import AppComponent from './app.component';
import AppService from './app.service';
import constants from './app.constant';

import whenScrolled from '../components/when-scrolled';

angular
  .module('foodApp', [
    ngAnimate, ngSanitize, uiRouter, uiBootstrap,
    constants, whenScrolled,
  ])
  .component('foodApp', AppComponent)
  .service('App', AppService)
  .config(routeConfig);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['foodApp'], {
      strictDi: true,
    });
  });
