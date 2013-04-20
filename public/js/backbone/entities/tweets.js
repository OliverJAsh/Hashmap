App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Tweets = Backbone.Collection.extend({
    model: Entities.Tweet
  });
});