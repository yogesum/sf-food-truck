import angular from 'angular';
import moment from 'moment';

const constants = angular
  .module('foodApp.constants', [])
  .constant('moment', moment)
  .constant('urls', {
    API_SERVER: 'http://localhost:3001/api',
  });

export default constants.name;
