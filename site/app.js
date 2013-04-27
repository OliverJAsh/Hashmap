/**
 * Module dependencies.
 */

var
  _ = require('lodash'),
  express = require('express'),
  http = require('http'),
  path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var Twitter = require('ntwitter');
var twit = new Twitter({
  consumer_key: 'i8be2OTfNtWwqg74vF6ncg',
  consumer_secret: 'W1qUG5iBVOvVJSoj5iy2LNJmvekH2PtDYVz8z6Auk',
  access_token_key: '21567037-enEHliRhOVXXRiPXEgugkbo852WhJydriDAHCArxk',
  access_token_secret: 'UZXzCr7TzcQfR2Kl2oYmcr6GuDDsyDVIt9AOG7uf1I'
});

var io = require('socket.io').listen(server);

var tweetService = require('../lib/tweet/service');

var hashtags = [];

io.sockets.on('connection', function (socket) {

  socket.on('hashtags:create', function (hashtag) {

    hashtags.push(hashtag);
    twit.stream('statuses/filter', {
      track: hashtags.map(function (hashtag) {
        return '#' + hashtag.name;
      }).join (','),
      locations: '-180,-90,180,90'
    }, function (stream) {
      stream.on('error', function (error) {
        console.log(error);
      });
      stream.on('end', function (response) {
        console.log(response);
      });
      stream.on('destroy', function (response) {
        console.log(response);
      });
      stream.on('data', function (data) {
        // Data could be disconnect
        if (!data.entities) return;
        var tweet = data;

        if (!tweet.geo) return;

        hashtags.forEach(function (hashtag) {
          var tagged = _.find(tweet.entities.hashtags, function (tweetHashtag) {
            // Match whole hashtag only
            var hasHashtag = new RegExp('(?:^|\s)(' + hashtag.name + ')(?=\s|$)', 'i');
            console.log(hasHashtag, tweetHashtag);
            return hasHashtag.test(tweetHashtag.text);
          });

          if (!tagged) return;

          // console.log(require('util').inspect(tweet, { depth: null }));

          tweet.hashtag = hashtag.name;

          tweetService.create(tweet, function (error, createdModel) {
            if (error) throw error;
            socket.emit('tweets:create', createdModel);
          });
        });
      });
    });

    socket.emit('hashtags:create', hashtag);
  });
});
