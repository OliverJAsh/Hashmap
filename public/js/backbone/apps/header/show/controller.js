App.module('HeaderApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Controller = {
    showHeader: function () {
      var headerView = new Show.Header();
      App.headerRegion.show(headerView);
    }
  };
});