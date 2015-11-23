// Ionic Starter App
angular.module('slider', ['ionic', 'slider.controllers', 'app', 'famous.angular'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 100);
 });
})
.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  // disable ionic animations (page swipe == no good)
  //$ionicConfigProvider.views.transition('none');

    // set up routes.
    $stateProvider
        .state('start', {
            url: "/start",
            templateUrl: "templates/start.html",
            controller: 'StartCtrl'    
        })
        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: 'RegisterCtrl'    
        })
        .state('slide1', {
            url: "/slide1",
            templateUrl: "templates/slide1.html",
            controller: 'Slide1Ctrl'    
        })
        .state('slide2', {
            url: "/slide2",
            templateUrl: "templates/slide2.html",
            controller: 'Slide2Ctrl'
             
        })
        .state('slide3', {
            url: "/slide3",
            templateUrl: "templates/slide3.html",
            controller: 'Slide3Ctrl'
             
        })
        .state('slide4', {
            url: "/slide4",
            templateUrl: "templates/slide4.html",
            controller: 'Slide4Ctrl'
             
        });
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
.config(function($ionicConfigProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'visualization'
    });
    $ionicConfigProvider.views.transition('ios');
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
  $urlRouterProvider.otherwise('start');
})
.constant('$ionicLoadingConfig', {
        template: '<ion-spinner class="spinner-assertive" icon="ripple"></ion-spinner>'
})
