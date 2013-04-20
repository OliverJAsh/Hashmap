App.module('HeaderApp.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Layout = Marionette.Layout.extend({
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

    onSubmit: function (event) {
      event.preventDefault();
      var query = this.$('input[type="text"]').val();
      this.trigger('form:submitted', query);
    }
  });

});