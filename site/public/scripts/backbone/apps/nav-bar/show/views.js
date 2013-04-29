App.module('NavBarApp.Show', function (Show, App, Backbone, Marionette) {

  Show.NavBar = Marionette.ItemView.extend({
    ui: {
      mapSearch: '.map-controls .text-input'
    },

    events: {
      'submit form': 'onSubmit'
    },

    template: JST['nav-bar'],

    onSubmit: function (event) {
      event.preventDefault()
      var geocoder = new google.maps.Geocoder()
      var address = this.ui.mapSearch.val()
      geocoder.geocode({ address: address }, _.bind(function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          App.map.setCenter(results[0].geometry.location)
          var marker = new google.maps.Marker({
            map: App.map,
            position: results[0].geometry.location
          })
          this.ui.mapSearch.blur()
        } else {
          alert('No such place could be found.');
        }
      }, this))
    }
  })

});