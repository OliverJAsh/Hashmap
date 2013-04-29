/**
 * Module dependencies.
 */

var
  _ = require('lodash'),
  express = require('express'),
  http = require('http'),
  path = require('path')

var app = express()

var
  env = process.env.NODE_ENV || 'development',
  debug = env === 'development'

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

  var publicRoutes = debug
    ? [__dirname + '/public', __dirname + '/temp']
    : [__dirname + '/build']
  publicRoutes.forEach(function (route) {
    app.use(express.static(route))
  })
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

var server = http.createServer(app)
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})

var Twitter = require('ntwitter')
var twit = new Twitter({
  consumer_key: 'i8be2OTfNtWwqg74vF6ncg',
  consumer_secret: 'W1qUG5iBVOvVJSoj5iy2LNJmvekH2PtDYVz8z6Auk',
  access_token_key: '21567037-enEHliRhOVXXRiPXEgugkbo852WhJydriDAHCArxk',
  access_token_secret: 'UZXzCr7TzcQfR2Kl2oYmcr6GuDDsyDVIt9AOG7uf1I'
})

var io = require('socket.io').listen(server)

var tweetService = require('../lib/tweet/service')

var hashtags = []

io.sockets.on('connection', function (socket) {

  socket.on('hashtags:create', function (hashtag) {

    hashtags.push(hashtag)
    socket.emit('hashtags:create', hashtag)

    console.log('Matching for hashtags:', hashtags)

    twit.stream('statuses/filter', {
      track: hashtags.map(function (hashtag) {
        return '#' + hashtag.name
      }).join (','),
      locations: '-180,-90,180,90'
    }, function (stream) {
      stream.on('error', function (error) {
        console.log('Error:', error)
      })
      stream.on('end', function (response) {
        console.log('End:', response)
      })
      stream.on('destroy', function (response) {
        console.log('Destroy:', response)
      })
      stream.on('data', function (data) {
        // Data could be disconnect
        if (!data.entities) return
        var tweet = data

        if (!tweet.geo) return

        // For each hashtag that has been added, we have to loop through every
        // hashtag in the received tweet to see if we have a match. Unfortunately
        // the Twitter stream API does not allow you to filter by matches
        // explicitly

        hashtags.forEach(function (hashtag) {
          var hasHashtag = new RegExp('(?:^|\s)(' + hashtag.name + ')(?=\s|$)', 'i')

          var tagged = _.find(tweet.entities.hashtags, function (tweetHashtag) {
            // Match whole hashtag only
            console.log('Hashtag:', tweetHashtag.text)
            return hasHashtag.test(tweetHashtag.text)
          })

          // If the tweet contains no matches, we skip it.
          if (!tagged) return

          // console.log(require('util').inspect(tweet, { depth: null }))

          tweet.hashtag = hashtag.name

          // If we have a match, we create an entity of it and send it to the
          // client.
          tweetService.create(tweet, function (error, createdModel) {
            if (error) throw error
            socket.emit('tweets:create', createdModel)
          })
        })
      })
    })
  })
})
