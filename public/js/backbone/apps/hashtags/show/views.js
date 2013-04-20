App.module('HashtagsApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Hashtag = Marionette.Layout.extend({
    template: JST['hashtag'],

    regions: {
      tweetsRegion: '.tweets'
    }
  });

  Show.Hashtags = Marionette.CollectionView.extend({
    itemView: Show.Hashtag
  });

});