App.module('NavBarApp', function (NavBarApp) {

  var API = {
    showNavBar: function () {
      NavBarApp.Show.Controller.showNavBar();
    }
  };

  NavBarApp.on('start', function () {
    API.showNavBar();
  });

});