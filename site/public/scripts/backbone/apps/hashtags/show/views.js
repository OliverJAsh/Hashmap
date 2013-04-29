App.module('HashtagsApp.Show', function (Show) {

  Show.Hashtag = Marionette.Layout.extend({
    tagName: 'li',
    template: JST['hashtag'],

    regions: {
      tweetsRegion: '.tweets'
    }
  });

  Show.Hashtags = Marionette.CompositeView.extend({
    template: JST['hashtags'],
    itemView: Show.Hashtag,
    itemViewContainer: 'ul'
  });

});