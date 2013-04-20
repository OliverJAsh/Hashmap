var App = new Marionette.Application();

App.addRegions({
  headerRegion: '.header',
  hashtagsRegion: '.hashtags'
});






var HashtagView = Marionette.Layout.extend({
  template: JST['hashtag']
});

var HashtagsView = Marionette.CollectionView.extend({
  itemView: HashtagView
});




App.addInitializer(function () {
  this.hashtags = App.request('create:hashtag:entities');

  App.reqres.setHandler('hashtags', function () {
    return App.hashtags;
  });

  App.vent.on('add:hashtag', function (name) {
    socket.emit('hashtags:create', { name: name });
  });

  window.socket = io.connect('http://localhost');

  socket.on('connect', function () {
    console.log('Socket connected');
  });

  socket.on('disconnect', function () {
    console.log('Socket disconnected');
  });

  socket.on('tweets:create', function (tweet) {
    var hashtags = App.request('hashtags');
    _.each(hashtags.models, function (hashtag) {
      if (tweet.hashtag !== hashtag.get('name')) return;
      hashtag.tweets = hashtag.tweets || new App.Entities.Tweets();
      hashtag.tweets.add(tweet);
    });
  });

  socket.on('hashtags:create', function (hashtag) {
    var hashtags = App.request('hashtags');
    hashtags.add(hashtag);
  });

  var hashtagsView = new HashtagsView({ collection: this.hashtags });

  App.hashtagsRegion.show(hashtagsView);

});
