App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Tweet = Backbone.Model.extend({
    parse: function (response) {

      if (!_.isEmpty(response.geo)) return response

      // If there is no geo, we get one from the place object.
      var coordinates = response.place.bounding_box.coordinates[0]

      var bounds = new google.maps.LatLngBounds()
      _.each(coordinates, function (coord) {
         bounds.extend(new google.maps.LatLng(coord[0], coord[1]))
      })
      var center = bounds.getCenter()

      response.geo = {}
      response.geo.coordinates = [center.lng(), center.lat()]

      return response
    }
  });

});