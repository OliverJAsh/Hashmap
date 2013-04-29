App.module('HeaderApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Controller = {
    showHeader: function () {
      var layout = this._getLayout();
      App.headerRegion.show(layout);
    },

    _getLayout: function () {
      var
        layout = new Show.Layout(),
        hashtagFormView = this._getHashtagFormView();

      layout.on('live:mode:button:clicked', function () {
        App.request('toggle:live:mode')
      })

      layout.on('show', function () {
        layout.hashtagFormRegion.show(hashtagFormView);
      });

      return layout;
    },

    _getHashtagFormView: function () {
      var hashtagFormView = new Show.HashtagForm();

      hashtagFormView.on('form:submitted', function (name) {
        App.vent.trigger('add:hashtag', name);
      });

      return hashtagFormView;
    }
  };
});