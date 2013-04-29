App.module('MapApp.Show', function (Show, App) {

  Show.Controller = {
    showMap: function () {
      var mapView = this._getMapView();
      App.mapRegion.show(mapView);
    },

    _getMapView: function () {
      var mapView = new Show.Map();

      return mapView;
    }
  };
});