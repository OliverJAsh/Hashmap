App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Hashtags = Backbone.Collection.extend({
    url: '/api/hashtags',
    model: Entities.Hashtag
  });

  App.reqres.setHandler('create:hashtag:entities', function () {
    var hashtags = new Entities.Hashtags();
    return hashtags;
  });

});
