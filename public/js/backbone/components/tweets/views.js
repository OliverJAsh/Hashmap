App.module('Components.Tweets', function (Tweets, App, Backbone, Marionette, $, _) {

  Tweets.Tweet = Marionette.ItemView.extend({
    tagName: 'li',
    template: JST['tweet']
  });

  Tweets.Tweets = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Tweets.Tweet
  });

});