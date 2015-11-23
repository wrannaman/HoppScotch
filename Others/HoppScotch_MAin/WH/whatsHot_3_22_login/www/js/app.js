// Ionic Starter App
angular.module('slider', ['ionic', 'slider.controllers','ngResource', 'app', 'famous.angular'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 100);
 });
})
// .factory('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
//     console.log("*** Twitter Service ***** ");
//     // 1
//     var twitterKey = "STORAGE.TWITTER.KEY";
//     var clientId = '807596282658993';
//     var clientSecret = 'H1utTUfsUlpwCKBg8zxaRw0NonAIDkSWRqLtR7prdEhJG2aJiL';

//     // 2
//     function storeUserToken(data) {
//         window.localStorage.setItem(twitterKey, JSON.stringify(data));
//     }

//     function getStoredToken() {
//         return window.localStorage.getItem(twitterKey);
//     }

//     // 3
//     function createTwitterSignature(method, url) {
//         var token = angular.fromJson(getStoredToken());
//         var oauthObject = {
//             oauth_consumer_key: clientId,
//             oauth_nonce: $cordovaOauthUtility.createNonce(10),
//             oauth_signature_method: "HMAC-SHA1",
//             oauth_token: token.oauth_token,
//             oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
//             oauth_version: "1.0"
//         };
//         var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
//         $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
//     }

//     return {
//         // 4
//         initialize: function() {
//             var deferred = $q.defer();
//             var token = getStoredToken();

//             if (token !== null) {
//                 deferred.resolve(true);
//             } else {
//                 $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
//                     storeUserToken(result);
//                     deferred.resolve(true);
//                 }, function(error) {
//                     deferred.reject(false);
//                 });
//             }
//             return deferred.promise;
//         },
//         // 5
//         isAuthenticated: function() {
//             return getStoredToken() !== null;
//         },
//         // 6
//         getHomeTimeline: function() {
//             var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
//             createTwitterSignature('GET', home_tl_url);
//             return $resource(home_tl_url).query();
//         },
//         storeUserToken: storeUserToken,
//         getStoredToken: getStoredToken,
//         createTwitterSignature: createTwitterSignature
//     };
// })
.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  // disable ionic animations (page swipe == no good)
  $ionicConfigProvider.views.transition('none');

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
             
        })
        .state('flip', {
            url: "/flip",
            templateUrl: "templates/flip.html",
            controller: 'FlipCtrl'
             
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "templates/chat.html",
            controller: 'ChatCtrl'
             
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
.config(function($ionicConfigProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'visualization'
    });
    $ionicConfigProvider.views.transition('none');
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
