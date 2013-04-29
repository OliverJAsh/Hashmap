App.module('NavBarApp.Show', function (Show, App, Backbone, Marionette) {

  Show.NavBar = Marionette.ItemView.extend({
    ui: {
      mapControls: '.map-controls'
    },

    events: {
      'submit form': 'onSubmit'
    },

    template: JST['nav-bar'],

    onSubmit: function (event) {
      event.preventDefault()
      var geocoder = new google.maps.Geocoder()
      var address = this.ui.mapControls.find('.text-input').val()
      geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          App.map.setCenter(results[0].geometry.location)
          var marker = new google.maps.Marker({
            map: App.map,
            position: results[0].geometry.location
          })
        } else {
          alert('No such place could be found.');
        }
      });
    }
  })

});