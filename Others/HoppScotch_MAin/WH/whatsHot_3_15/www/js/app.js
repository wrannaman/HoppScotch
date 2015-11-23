// Ionic Starter App
angular.module('slider', ['ionic', 'slider.controllers', 'app', 'famous.angular'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('slider', {
                url: "/slider",
                abstract: true,
                templateUrl: "templates/slideMenu.html",
                controller: 'SlideMenuCtrl'
            })

            .state('slider.slides', {
                url: "/slides",
                views: {
                    'menuContent': {
                        templateUrl: "templates/slides.html",
                        controller: 'SlidesCtrl'
                    }
                }
            })
    });

angular.module('app', ['ionic', 'app.controllers', 'uiGmapgoogle-maps', 'slider'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'visualization'
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  //.state('app.slider', {
  //    url: "/slider",
  //    templateUrl: "templates/slider.html",
  //    controller: 'SliderCtrl'
  //})
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/slider/slides');
})

.constant('$ionicLoadingConfig', {
        template: '<ion-spinner class="spinner-assertive" icon="ripple"></ion-spinner>'
})