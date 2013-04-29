App.module('HeaderApp.Show', function (Show, App, Backbone, Marionette) {

  Show.Layout = Marionette.Layout.extend({
    ui: {
      'liveModeButton': '.js-toggle-live-mode'
    },

    events: {
      'click .js-toggle-live-mode': 'onLiveModeButtonClicked'
    },

    onLiveModeButtonClicked: function () {
      this.ui.liveModeButton
        .toggleClass('btn--off')
        .toggleClass('btn--on')
      this.trigger('live:mode:button:clicked')
    },

    template: JST['header-show-layout'],

    regions: {
      hashtagFormRegion: '.hashtag-form'
    }
  });

  Show.HashtagForm = Marionette.ItemView.extend({
    tagName: 'form',
    template: JST['hashtag-form'],

    events: {
      'submit': 'onSubmit'
    },

    ui: {
      hashtagInput: 'input[type="text"]'
    },

    onSubmit: function (event) {
      event.preventDefault();
      var query = this.ui.hashtagInput.val();
      this.trigger('form:submitted', query);
      this.ui.hashtagInput
        .val('')
        .blur()
    }
  });

});