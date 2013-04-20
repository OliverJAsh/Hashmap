var App = new Marionette.Application();

App.addRegions({
  headerRegion: '.header',
  hashtagsRegion: '.hashtags'
});




App.addInitializer(function () {

  this.hashtags = App.request('create:hashtag:entities');

  App.reqres.setHandler('hashtags', function () {
    return App.hashtags;
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
      hashtag.tweets.add(tweet);
    });
  });

  socket.on('hashtags:create', function (hashtag) {
    var hashtags = App.request('hashtags');
    hashtags.add(hashtag);
  });

  App.vent.on('add:hashtag', function (name) {
    socket.emit('hashtags:create', { name: name });
  });

});
