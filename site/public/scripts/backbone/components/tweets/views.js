App.module('Components.Tweets', function (Tweets, App, Backbone, Marionette) {

  Tweets.Tweet = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'tweet',
    template: JST['tweet'],

    onShow: function () {

      var infoWindow = new google.maps.InfoWindow({
        content: $('<div class="tweet">').append(this.$el.clone()).html()
      })

      var geo = this.model.get('geo')
      if (!geo) return

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(+geo.coordinates[0], +geo.coordinates[1]),
        map: App.map
      })

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(App.map, marker)
      })

      this.$el.on('click', function () {
        $('body').animate({ scrollTop: $('.map').offset().top })
        infoWindow.open(App.map, marker)
      })

      var liveMode = App.request('live:mode')
      if (liveMode) infoWindow.open(App.map, marker)

    }
  })

  Tweets.Tweets = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Tweets.Tweet
  })

})