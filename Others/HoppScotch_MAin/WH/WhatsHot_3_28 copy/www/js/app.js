// Ionic Starter App
angular.module('slider', ['ionic', 'slider.controllers','ngResource', 'uiGmapgoogle-maps','famous.angular'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
        if(window.StatusBar) {
          StatusBar.styleLightContent();
        }
    }, 100);
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
        .state('end', {
            url: "/end",
            templateUrl: "templates/end.html",
            controller: 'StartCtrl'
             
        })
    $urlRouterProvider.otherwise('start');
})
.constant('$ionicLoadingConfig', {
        template: '<ion-spinner class="spinner-assertive" icon="ripple"></ion-spinner>'
})
