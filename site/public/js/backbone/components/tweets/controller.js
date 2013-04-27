App.module('Components.Tweets', function (Tweets, App, Backbone, Marionette, $, _) {

  Tweets.Controller = Marionette.Controller.extend({
    show: function () {
      var tweetsView = this._getTweetsView();
      this.options.region.show(tweetsView);
    },

    _getTweetsView: function () {
      var tweetsView = new Tweets.Tweets({ collection: this.options.tweets });
      return tweetsView;
    }
  });

  App.reqres.setHandler('tweets', function (options) {
    var tweetsController = new Tweets.Controller(options);
    return tweetsController;
  });

});