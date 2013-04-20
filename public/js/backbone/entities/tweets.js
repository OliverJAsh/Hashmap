App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Tweets = Backbone.Collection.extend({
    model: Entities.Tweet
  });

  App.reqres.setHandler('tweet:entities', function () {
    var tweets = new Entities.Tweets();
    return tweets;
  });

});