App.module('HashtagsApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Controller = {
    showHashtags: function () {
      var
        hashtags = App.request('hashtags'),
        hashtagsView = this._getHashtagsView(hashtags);

      App.hashtagsRegion.show(hashtagsView);
    },

    _getHashtagsView: function (hashtags) {
      var hashtagsView = new Show.Hashtags({ collection: hashtags });

      return hashtagsView;
    }
  };

});