App.module('HashtagsApp', function (HashtagsApp, App, Backbone, Marionette, $, _) {

  var API = {
    showHashtags: function () {
      HashtagsApp.Show.Controller.showHashtags();
    }
  };

  HashtagsApp.on('start', function () {
    API.showHashtags();
  });
});