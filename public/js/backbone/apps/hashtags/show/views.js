App.module('HashtagsApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Hashtag = Marionette.Layout.extend({
    template: JST['hashtag']
  });

  Show.Hashtags = Marionette.CollectionView.extend({
    itemView: Show.Hashtag
  });

});