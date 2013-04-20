App.module('HeaderApp', function (HeaderApp, App, Backbone, Marionette, $, _) {

  var API = {
    showHeader: function () {
      HeaderApp.Show.Controller.showHeader();
    }
  };

  HeaderApp.on('start', function () {
    API.showHeader();
  });
});