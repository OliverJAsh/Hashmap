var Hashtag = Backbone.Model.extend({

});

var Hashtags = Backbone.Collection.extend({
  url: '/api/hashtags',
  model: Hashtag
});

var Tweet = Backbone.Model.extend({
  initialize: function () {
    console.log(this);
  }
});

var Tweets = Backbone.Collection.extend({
  model: Tweet
});

var hashtags = new Hashtags();

window.socket = io.connect('http://localhost');

socket.on('connect', function () {
  console.log('Socket connected');
  socket.emit('hashtags:create', { name: 'boston' });
});

socket.on('disconnect', function () {
  console.log('Socket disconnected');
});

socket.on('tweets:create', function (tweet) {
  _.each(hashtags.models, function (hashtag) {
    if (tweet.hashtag !== hashtag.get('name')) return;
    hashtag.tweets = hashtag.tweets || new Tweets();
    hashtag.tweets.add(tweet);
  });
});

socket.on('hashtags:create', function (hashtag) {
  hashtags.add(hashtag);
});


var HashtagView = Marionette.Layout.extend({
  template: function () {
    return $('<div>').text(arguments[0].name).prop('outerHTML');
  }
});

var HashtagsView = Marionette.CollectionView.extend({
  itemView: HashtagView
});

var App = new Marionette.Application();

App.addRegions({
  hashtagsRegion: '.hashtags'
});

var hashtagsView = new HashtagsView({ collection: hashtags });

App.hashtagsRegion.show(hashtagsView);