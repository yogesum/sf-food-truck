import angular from 'angular';
import moment from 'moment';

const constants = angular
  .module('foodApp.constants', [])
  .constant('moment', moment)
  .constant('urls', {
    API_SERVER: '127.0.0.1:3001',
  });

export default constants.name;
