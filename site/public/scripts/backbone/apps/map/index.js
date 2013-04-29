App.module('MapApp', function (MapApp) {

  var API = {
    showMap: function () {
      MapApp.Show.Controller.showMap();
    }
  };

  MapApp.on('start', function () {
    API.showMap();
  });

});