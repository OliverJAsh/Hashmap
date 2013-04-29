var
  _ = require('lodash'),
  express = require('express'),
  http = require('http')

var
  env = process.env.NODE_ENV || 'development',
  debug = env === 'development',
  // Only have debug logging on development
  logLevel = debug ? 'debug' : 'info',
  logger = require('logga')({ timeOnly: debug, logLevel: logLevel })

var app = express()

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)

  // Setup routes for development || production
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

io.sockets.on('connection', function (socket) {

  // When a socket disconnects, we delete their Twitter stream and reset the
  // hashtags.
  var
    hashtags = [],
    twitterStream

  socket.on('disconnect', function () {
    if (twitterStream) twitterStream.destroy()
    hashtags = []
  })

  socket.on('hashtags:create', function (hashtag) {

    hashtags.push(_.extend({
      matcher: new RegExp('(?:^|\s)(' + hashtag.name + ')(?=\s|$)', 'i')
    }, hashtag))

    function prop(key) {
      return function (item) {
        return item[key]
      }
    }

    logger.info('Matching for hashtags:', hashtags.map(prop('name')))

    // Setup the Twitter stream! Track our hashtags, and assert a location.
    // Include replies.
    twit.stream('statuses/filter', {
      track: hashtags.map(prop('name')).join(','),
      locations: '-180,-90,180,90',
      replies: 'all'
    }, function (stream) {

      // Store the stream in the scope of this socket so that we can destroy it
      // on disconnect.
      twitterStream = stream

      stream.on('error', function (error) {
        logger.error(error)
      })

      stream.on('data', function (data) {
        var tweet = data

        // No geo? Skip this tweet.
        if (!tweet.geo) return

        var tweetHashtags = tweet.entities.hashtags
        tweetHashtags = tweetHashtags.map(prop('text'))
        // No hashtags? Skip this tweet.
        if (!tweetHashtags.length) return

        // For each hashtag that has been added, we have to loop through every
        // hashtag in the received tweet to see if we have a match. Unfortunately
        // the Twitter stream API does not allow you to filter by matches
        // explicitly

        logger.debug('Hashtags:', tweetHashtags)
        socket.emit('log:tweet:hashtags', tweetHashtags)

        hashtags.forEach(function (hashtag) {
          var tagged = _.find(tweetHashtags, function (tweetHashtag) {
            // Match whole hashtag only
            hashtag.matcher.test(tweetHashtag.text)
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
