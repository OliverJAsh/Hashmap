// Helper function
function prop(key) {
  return function (item) {
    return item[key]
  }
}

var App = new Marionette.Application()

App.addRegions({
  navBarRegion: '.nav-bar',
  mapRegion: '.map',
  headerRegion: '.header',
  hashtagsRegion: '.hashtags'
})

App.reqres.setHandler('toggle:live:mode', function () {
  App.liveMode = !App.liveMode
})

App.reqres.setHandler('live:mode', function () {
  return App.liveMode
})

App.addInitializer(function () {

  this.hashtags = App.request('create:hashtag:entities')

  App.reqres.setHandler('hashtags', function () {
    return App.hashtags
  })

  var socket = io.connect()

  socket.on('tweets:create', function (tweet) {
    var hashtags = App.request('hashtags')
    _.each(hashtags.models, function (hashtag) {
      if (tweet.hashtag !== hashtag.get('name')) return
      hashtag.tweets.add(tweet, { parse: true })
    })
  })

  socket.on('log:tweet', function (tweet) {
    console.log('Tweet:', tweet)
  })

  socket.on('hashtag:created', function (hashtags) {
    console.log('Matching for hashtags:', hashtags.map(prop('name')))
  })

  App.vent.on('add:hashtag', function (name) {
    var hashtag = { name: name }
    socket.emit('hashtags:create', hashtag)
    var hashtags = App.request('hashtags')
    hashtags.add(hashtag)
  })

  google.maps.event.addDomListener(window, 'load', _.bind(function initialize() {
    var mapOptions = {
      // London
      center: new google.maps.LatLng(51.51121389999999, -0.11982439999997041),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    App.mapRegion.ensureEl()
    App.map = new google.maps.Map(App.mapRegion.$el[0], mapOptions)
  }, this))

  var $intro = $('.intro')
  $intro.on('click', '.js-hide-intro', function () {
    $intro.slideUp()
  })

})
