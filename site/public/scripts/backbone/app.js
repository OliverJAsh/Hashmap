// Helper function
function prop(key) {
  return function (item) {
    return item[key]
  }
}

var App = new Marionette.Application()

App.addRegions({
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

  var socket = io.connect('http://localhost')

  socket.on('tweets:create', function (tweet) {
    var hashtags = App.request('hashtags')
    _.each(hashtags.models, function (hashtag) {
      if (tweet.hashtag !== hashtag.get('name')) return
      hashtag.tweets.add(tweet)
    })
  })

  socket.on('log:tweet', function (tweet) {
    console.log('Hashtags:', tweet.entities.hashtags.map(prop('text')))
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

  google.maps.event.addDomListener(window, 'load', function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    App.map = new google.maps.Map(document.querySelector('.map'), mapOptions)
  })

})
