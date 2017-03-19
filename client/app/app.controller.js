import MarkerClusterer from 'node-js-marker-clusterer';

class AppController {
  /* @ngInject */
  constructor($window, $log, App) {
    this.$window = $window;
    this.$log = $log;
    this.document = $window.document;
    this.App = App;
  }

  $onInit() {
    this.app = {
      name: 'Food Trucks | San Francisco',
      version: '1.0.0',
    };

    this.ui = { lazyload: true, loading: false };
    this.params = {
      start: 0,
      rows: 30,
      q: '',
      fl: 'id,applicant,latitude,longitude,address,fooditems,status',
    };
    this.reset();
    this.coords = { latitude: 37.760151, longitude: -122.443505 };

    this.getCoords();

    const script = this.document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
    this.document.body.append(script);

    this.$window.initMap = () => angular.element(this.document
      .querySelector('#map'))
      .scope()
      .$ctrl.initMap();
  }

  reset() {
    const { google } = this.$window;
    this.trucks = [];
    this.params.start = 0;

    // clean up listener on markers
    (this.markers || [])
      .forEach((marker) => {
        google.maps.event.clearListeners(marker, 'click');
        marker.setMap(null);
      });

    if (this.cluster) this.cluster.clearMarkers();
    this.markers = [];
  }

  initMap() {
    const { google } = this.$window;
    const imagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

    const { latitude: lat, longitude: lng } = this.coords;
    this.map = new google.maps.Map(this.document.querySelector('#map'), {
      zoom: 15,
      center: { lat, lng },
    });
    this.cluster = new MarkerClusterer(this.map, [], { imagePath });
    this.setMarkers();
  }

  getCoords() {
    this.App
      .getCurrentPosition()
      .then(({ coords }) => (this.coords = coords))
      .catch((err) => {
        this.$log.error('Failed to get current location', err);
        this.error = err.message;
      });
  }

  setMarkers(reset) {
    const { google } = this.$window;
    if (!reset && !this.ui.lazyload) return null;
    this.ui = { lazyload: false, loading: true };

    return this.App
      .getTrucks(Object.assign(this.params, {
        latlng: `${this.coords.latitude},${this.coords.longitude}`,
      }))
      .then(({ data: { data, numFound } }) => {
        data.forEach(truck => this.trucks.push(truck));
        this.numFound = numFound;

        this.markers = data
          .map(({
            latitude: lat,
            longitude: lng,
            applicant,
            address,
            distance,
            fooditems = [],
            status,
          }) => {
            const marker = new google.maps.Marker({
              position: { lat, lng },
              label: applicant[0].toUpperCase(),
            });

            const info = new google.maps.InfoWindow({
              content: [
                `<h4>${applicant} <small>${distance.toFixed(3)} KM</small></h4>`,
                `<h6>${fooditems.join(', ')}</h5>`,
                `<small class='pull-left'>${address}</small>`,
                `<small class='pull-right'>${status}</small>`,
              ].join(''),
            });

            google.maps.event.addListener(marker, 'click', () => info.open(this.map, marker));

            return marker;
          });

        // Add a marker clusterer to manage the markers.
        this.cluster.addMarkers(this.markers);

        this.ui.loading = false; // xhr ended
        this.ui.lazyload = data.length === this.params.rows;
        this.params.start += this.params.rows;
      });
  }
}

export default AppController;
