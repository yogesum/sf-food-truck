class AppController {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.app = {
      name: 'Food Trucks | San Francisco',
      version: '1.0.0',
    };
  }
}

export default AppController;
