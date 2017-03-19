import angular from 'angular';
import whenScrolled from './when-scrolled.directive';

export default angular
  .module('foodApp.when-scrolled', [])
  .directive('whenScrolled', whenScrolled)
  .name;
