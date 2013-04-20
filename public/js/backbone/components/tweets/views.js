App.module('Components.Tweets', function (Tweets, App, Backbone, Marionette, $, _) {

  Tweets.Tweet = Marionette.ItemView.extend({
    tagName: 'li',
    template: JST['tweet'],

    onShow: function () {

      var infoWindow = new google.maps.InfoWindow({
        content: this.model.get('text')
      });

      var geo = this.model.get('geo');
      if (!geo) return;

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(+geo.coordinates[0], +geo.coordinates[1]),
        map: App.map,
        title: 'Test'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(App.map, marker);
      });

      this.$el.on('click', function () {
        infoWindow.open(App.map, marker);
      });

      infoWindow.open(App.map, marker);

    }
  });

  Tweets.Tweets = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Tweets.Tweet
  });

});