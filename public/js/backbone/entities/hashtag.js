App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

  Entities.Hashtag = Backbone.Model.extend({
    initialize: function () {
      this.tweets = App.request('tweet:entities');
    }
  });
});