App.module('NavBarApp.Show', function (Show, App) {

  Show.Controller = {
    showNavBar: function () {
      var navBarView = this._getNavBarView();
      App.navBarRegion.show(navBarView);
    },

    _getNavBarView: function () {
      var navBarView = new Show.NavBar();

      return navBarView;
    }
  };
});