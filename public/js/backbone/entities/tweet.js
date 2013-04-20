App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Tweet = Backbone.Model.extend({
    initialize: function () {
      console.log(this);
    }
  });
});