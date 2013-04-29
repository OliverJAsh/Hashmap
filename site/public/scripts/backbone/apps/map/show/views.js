App.module('MapApp.Show', function (Show, App, Backbone, Marionette) {

  Show.Map = Marionette.CompositeView.extend({
    ui: {
      controls: '.map__controls',
      container: '.map__container'
    },

    events: {
      'submit form': 'onSubmit'
    },

    template: JST['map'],

    onRender: function () {
      google.maps.event.addDomListener(window, 'load', _.bind(function initialize() {
        var mapOptions = {
          // London
          center: new google.maps.LatLng(51.51121389999999, -0.11982439999997041),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        App.map = new google.maps.Map(this.ui.container[0], mapOptions)
      }, this))
    },

    onSubmit: function (event) {
      event.preventDefault()
      var geocoder = new google.maps.Geocoder()
      var address = this.ui.controls.find('.text-input').val()
      geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          App.map.setCenter(results[0].geometry.location)
          var marker = new google.maps.Marker({
            map: App.map,
            position: results[0].geometry.location
          })
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  })

});