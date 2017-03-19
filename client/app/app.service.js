class AppService {
  /* @ngInject */
  constructor($http, urls) {
    this.$http = $http;
    this.API_SERVER = urls.API_SERVER;
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
    }

    return Promise.reject('Geolocation is not supported');
  }

  getTrucks(params) {
    return this
      .$http
      .get(`${this.API_SERVER}/foodtrucks`, { params });
  }
}

export default AppService;
