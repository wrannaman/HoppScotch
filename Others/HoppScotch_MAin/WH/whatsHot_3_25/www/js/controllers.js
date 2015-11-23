angular.module('slider.controllers', ['ngTouch', 'ionic','ngCordova.plugins.geolocation', 'ngResource','ngCordovaOauth'])
.controller('StartCtrl',    function ($scope, $rootScope,$ionicPlatform, $ionicLoading,$cordovaGeolocation,$cordovaOauth,$cordovaOauthUtility,$http,$state, $timeout, $famous) {

    //famous
    console.log('start');
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var Engine = $famous['famous/core/Engine'];
    Engine.setOptions({
      appMode:false
    });

    $scope.iconTransition    = new Transitionable([0, 0, 0]);
    $scope.nameTransition    = new Transitionable([0, 0, 0]);
    $scope.logTransition     = new Transitionable([0, 0, 0]);
    $scope.dividerTransition = new Transitionable([0, 0, 0]);
    $scope.formTransition    = new Transitionable([0, 0, 0]);
    $scope.submitTransition    = new Transitionable([0, 0, 0]);
    $scope.fbTransition = new Transitionable([0, 0, 0]);
    $scope.twTransition = new Transitionable([0, 0, 0]);
    $scope.button2Transition = new Transitionable([0, 0, 0]);
    $scope.button3Transition = new Transitionable([0, 0, 0]);
    $scope.opacity           = new Transitionable(0);

    $scope.animate = function() {
      console.log('animate');
        $scope.iconTransition.set(   [0, 100, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.nameTransition.set(   [0, 200, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.logTransition.set(    [0, 250, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.dividerTransition.set([0, 375, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.formTransition.set(   [0, 375, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.submitTransition.set( [0, 450, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.fbTransition.set(     [120, 375, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.twTransition.set(     [-120, 375, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button2Transition.set([0, 500, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button3Transition.set([0, 500, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button2Transition.set([100, 400, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button3Transition.set([-100, 400, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
    }
    //$scope.animate();
    $scope.animateOut = function () {
      console.log('animate out');
      $scope.iconTransition.set(   [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.nameTransition.set(   [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.logTransition.set(    [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.dividerTransition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.submitTransition.set( [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.fbTransition.set(     [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.twTransition.set(     [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.formTransition.set(   [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.button2Transition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.button3Transition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
      $timeout(function(){
         $scope.iconTransition.set(0)
         $scope.nameTransition.set(0)
         $scope.logTransition.set(0)
         $scope.dividerTransition.set(0)
         $scope.formTransition.set(0)
         $scope.button2Transition.set(0)
         $scope.button3Transition.set(0)
         $scope.opacity.set(0)
         $scope.iconTransition    = new Transitionable([0, 0, 0]);
          $scope.nameTransition    = new Transitionable([0, 0, 0]);
          $scope.logTransition     = new Transitionable([0, 0, 0]);
          $scope.dividerTransition = new Transitionable([0, 0, 0]);
          $scope.formTransition    = new Transitionable([0, 0, 0]);
          $scope.submitTransition    = new Transitionable([0, 0, 0]);
          $scope.fbTransition = new Transitionable([0, 0, 0]);
          $scope.twTransition = new Transitionable([0, 0, 0]);
          $scope.button2Transition = new Transitionable([0, 0, 0]);
          $scope.button3Transition = new Transitionable([0, 0, 0]);
          $scope.opacity           = new Transitionable(0);
      },1000);
      
    }
    $scope.email;
    $scope.password;

    $scope.submit  = function () {
     var email = document.getElementById('email');
     var pass = document.getElementById('pass');
     console.log(email.value, pass.value);
      $scope.animateOut();
      // do logging
      $ionicLoading.show();

      $timeout(function() {
        $ionicLoading.hide();
        $state.go('flip');
      },1200);
    }
    $scope.facebookLogin = function() {
        // $cordovaOauth.facebook("807596282658993", ["email"]).then(function(result) {
        //     // results
        //     //alert(JSON.stringify(result));
        //     console.log(JSON.stringify(result));
        //     $state.go('flip');
        // }, function(error) {
        //     // error
        //     alert(JSON.stringify(error));
        // });
      $state.go('flip');
    }
    $scope.twitterLogin = function() {
        $cordovaOauth.twitter("zeH6jndkGwJQ8LmACp4TQhUC4", "DxdOrfE5xEp90tar0niEPi9nNBz7Pc5XMTApKNjwcYsfDHdGSu").then(function(result) {
            // results
            //alert(JSON.stringify(result));
            console.log(JSON.stringify(result));
            $state.go('flip');
        }, function(error) {
            // error
            alert(JSON.stringify(error));
        });
    }

    $scope.selection = function (select) {
      if (select == 'register') {
          $scope.animateOut();
          $timeout(function() {
            $state.go('flip');
          },1000);
      }
      if (select == 'learn') {
          $scope.animateOut();
          $timeout(function() {
            $state.go('slide1');
          },1100);
      }
      if (select == 'fb') {
        //alert('facebook!')
        
        $scope.facebookLogin();
      } 
      if (select == 'tw') {
        //alert('tw!');
        $scope.twitterLogin();
        
      }
      if (select == "enter") {
        $state.go('flip');
      }
    }
     
    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
})
.controller('RegisterCtrl', function ($scope,$log, $rootScope, $ionicLoading, $cordovaOauth, $cordovaGeolocation, $state, $timeout, $famous){
    //famous
    console.log('register');
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    $scope.iconTransition    = new Transitionable([0, 0, 0]);
    $scope.nameTransition    = new Transitionable([0, 0, 0]);
    $scope.logTransition     = new Transitionable([0, 0, 0]);
    $scope.dividerTransition = new Transitionable([0, 0, 0]);
    $scope.formTransition    = new Transitionable([0, 0, 0]);
    $scope.submitTransition  = new Transitionable([0, 0, 0]);
    $scope.fbTransition      = new Transitionable([0, 0, 0]);
    $scope.twTransition      = new Transitionable([0, 0, 0]);
    $scope.button2Transition = new Transitionable([0, 0, 0]);
    $scope.button3Transition = new Transitionable([0, 0, 0]);
    $scope.opacity           = new Transitionable(0);

    $scope.animate = function() {
      console.log('animate');
        $scope.iconTransition.set(   [0, 100, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.nameTransition.set(   [0, 200, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.logTransition.set(    [0, 250, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.dividerTransition.set([0, 300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.formTransition.set(   [0, 325, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.submitTransition.set( [0, 400, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.fbTransition.set(     [120, 405, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.twTransition.set(     [-120, 405, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button2Transition.set([0, 500, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button3Transition.set([0, 500, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button2Transition.set([-100, 550, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.button3Transition.set([100, 550, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
    }

    $scope.animateOut = function () {
      console.log('animate out');
      $scope.iconTransition.set(   [0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.nameTransition.set(   [0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.logTransition.set(    [0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.dividerTransition.set([0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.submitTransition.set( [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.fbTransition.set(     [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.twTransition.set(     [0, -100, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.formTransition.set(   [0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.button2Transition.set([0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.button3Transition.set([0, -100, 0], {duration: 1500, curve: Easing.outExpo})
      $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
      $timeout(function(){
         $scope.iconTransition.set(0)
         $scope.nameTransition.set(0)
         $scope.logTransition.set(0)
         $scope.dividerTransition.set(0)
         $scope.formTransition.set(0)
         $scope.button2Transition.set(0)
         $scope.button3Transition.set(0)
         $scope.opacity.set(0)
      },2000);
      
    }
    $scope.email;
    $scope.password;

    $scope.register  = function () {
     var email = document.getElementById('email');
     var pass = document.getElementById('pass');
     console.log(email.value, pass.value);
      $scope.animateOut();
      // do logging
      $ionicLoading.show();

      $timeout(function() {
        $ionicLoading.hide();
        $state.go('app.map');
      },2000);
    }
    
    $scope.selection = function (select) {
      if (select == 'back') {
          $state.go('start')
      }
      if (select == 'learn') {
          $scope.animateOut();
          $timeout(function() {
            $state.go('slide1');
          },1100);
      }
      if (select == 'fb') {
        $cordovaOauth.facebook("807596282658993", ["email", "public_profile"]).then(function(result) {
            // results
             console.log("Response Object -> " + JSON.stringify(result));
         }, function(error) {
            // error
            alert('error!' + error);
         });
      }
      if (select == 'tw') {
        $cordovaOauth.twitter("906945763-Y4xoais2cshlOt8kSJvFkOVZwWkj2BZSnIMDYc3d", "bUSthlvBo2HQLVjT34HmcHqHb0ZfTNP0B85qnvWj65wBh").then(function(result) {
            // results
             console.log("Response Object -> " + JSON.stringify(result));
         }, function(error) {
            // error
            alert('error!' + JSON.stringify(error));
         });
      }
    }
     
    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
})
.controller('Slide1Ctrl',   function ($scope, $rootScope, $cordovaGeolocation, $state, $timeout, $famous){
    //famous
    console.log('slide1');
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, 250, 0]);
    $scope.textTransition = new Transitionable([0, 350, 0]);
    $scope.text2Transition = new Transitionable([0, 400, 0]);
    $scope.text3Transition = new Transitionable([0, 450, 0]);
    
    $scope.opacity = new Transitionable(0);
    $scope.opacity2 = new Transitionable(0);
    $scope.opacity3 = new Transitionable(0);


    $scope.generateSize = function () { return [100,100]; }
    $scope.animate = function() {
      console.log('animate');
      
        $scope.textTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outExpo})
      
     
      $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
      $scope.imageTransition.set([0, 100, 0], {duration: 1000, curve: Easing.outExpo})
     
    };
    $scope.animate2 = function() {
      console.log('animate for second lines');
      $timeout(function(){
        $scope.opacity2.set(1, {duration: 1000, curve: "easeIn"})
        $scope.text2Transition.set([0, 325, 0], {duration: 1000, curve: Easing.outExpo})
      },100);
    };
    $scope.animate3 = function() {
      console.log('animate for third lines');
      $timeout(function(){
        $scope.opacity3.set(1, {duration: 1000, curve: "easeIn"})
        $scope.text3Transition.set([0, 450, 0], {duration: 1000, curve: Easing.outExpo})
      },100);
    };
      // animation begins on page load
    //$scope.animate();
    $scope.animateOut = function() {
          console.log('animate Out 1');
          $scope.opacity3.set(0, {duration: 1000, curve: "easeIn"})
          $scope.opacity2.set(0, {duration: 1000, curve: "easeIn"})
          $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
          $scope.textTransition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
          $scope.text2Transition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
          $scope.text3Transition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})
          $scope.imageTransition.set([0, -100, 0], {duration: 1000, curve: Easing.outExpo})

          $timeout(function() {
            $scope.imageTransition = new Transitionable([0, 250, 0]);
            $scope.textTransition = new Transitionable([0, 350, 0]);
            $scope.text2Transition = new Transitionable([0, 400, 0]);
            $scope.text3Transition = new Transitionable([0, 450, 0]);
            
            $scope.opacity = new Transitionable(0);
            $scope.opacity2 = new Transitionable(0);
            $scope.opacity3 = new Transitionable(0);
          },2000);
          
          
        };

    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
    $scope.increment = 0;
    // swipe 
    $scope.swipeLeft = function () {
      $scope.increment++;
      console.log('scope increment', $scope.increment);
      if ($scope.increment == 1) {
        $scope.animate2();
      }
      if ($scope.increment == 2) {
        $scope.animate3();
      }
      if ($scope.increment == 3) {
        $scope.animateOut();
        $timeout(function(){
          $state.go('slide2');
        },1200);
        
      }

      console.log('swipe left 1');
      
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
     // $scope.increment--;
     // console.log('scope increment', $scope.increment);
     //  if ($scope.increment == 1) {
     //    $scope.animate2();
     //  }
     //  if ($scope.increment == 2) {
     //    $scope.animate3();
     //  }
     //  if ($scope.increment == 3) {
     //    $state.go('slide1');
     //    $timeout(function () {
     //      $scope.animate();
     //      $scope.animate2();
     //      $scope.animcate3();
     //    },2000);
     //  }
    }
})
.controller('Slide2Ctrl',   function ($scope,$state,$cordovaGeolocation,$rootScope, $timeout, $famous){
    //famous
    console.log('slide2');
    console.log('scope increment', $scope.increment);
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var Transform = $famous['famous/core/Transform'];
    $scope.imageTransition = new Transitionable([0, 250, 0]);
    $scope.textTransition = new Transitionable([0, 350,0]);
    $scope.opacity = new Transitionable(0);
    $scope.outlineTransition = new Transitionable([0, -100, 0]);
    $scope.centerTransition = new Transitionable([0, -250, 0]);
    $scope.hoursTransition = new Transitionable([0, -250, 0]);
    $scope.minutesTransition = new Transitionable([0, -450, 0]);
    $scope.rotate = new Transitionable(0);
    $scope.rotate2 = new Transitionable(0);

    

    $scope.list = [
    {rotate: new Transitionable(0)},
    ]
    $scope.list2 = [
    {rotate: new Transitionable(0)},
    ]
    
    $scope.generateSize = function () { return [100,100]; }
    
    $scope.animate = function() {
      console.log('animate 2 ');
      $scope.outlineTransition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.hoursTransition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.minutesTransition.set([0, 150, 0], {duration: 1100, curve: Easing.outElastic})
      $scope.centerTransition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.textTransition.set([0, 300, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.opacity.set(1, {duration: 500, curve: "easeIn"})
      $scope.imageTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outExpo})
      $timeout(function(){
          $scope.list[0].rotate.set(Math.PI*10, {curve: Easing.outExpo, duration: 9000}) 
          $scope.list2[0].rotate.set(Math.PI*-20, {curve: Easing.outExpo, duration: 9000})
      },1100)
    };

    $scope.clockSpin = function () {
      console.log('calling clockspin');
        $scope.list[0].rotate.set(Math.PI*Math.random()*20, {curve: Easing.outExpo, duration: 5000}) 
        $scope.list2[0].rotate.set(Math.PI*Math.random()*-20, {curve: Easing.outExpo, duration: 5000})
    }

      // animation begins on page load
      $timeout(function() {
        $scope.animate();
      },500);
    

    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation 2');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
    $scope.animateOut = function() {
          console.log('animate Out 2');
            $scope.textTransition.set([0, -250, 0], {duration: 1000, curve: Easing.outExpo})
            $scope.imageTransition.set([0, -250, 0], {duration: 1000, curve: Easing.outExpo})
            $scope.outlineTransition.set([0, -250, 0], {duration: 1000, curve: Easing.outElastic})
            $scope.hoursTransition.set([0, -250, 0], {duration: 1000, curve: Easing.outElastic})
            $scope.minutesTransition.set([0, -250, 0], {duration: 1100, curve: Easing.outElastic})
            $scope.centerTransition.set([0, -250, 0], {duration: 1000, curve: Easing.outElastic})
            $scope.opacity.set(0, {duration: 500, curve: "easeIn"})

            $timeout(function() {
              $scope.imageTransition = new Transitionable([0, 250, 0]);
              $scope.textTransition = new Transitionable([0, 350,0]);
              $scope.opacity = new Transitionable(0);
              $scope.outlineTransition = new Transitionable([0, -100, 0]);
              $scope.centerTransition = new Transitionable([0, -250, 0]);
              $scope.hoursTransition = new Transitionable([0, -250, 0]);
              $scope.minutesTransition = new Transitionable([0, -450, 0]);
              $scope.rotate = new Transitionable(0);
              $scope.rotate2 = new Transitionable(0);
            },1200)
            
        };

    // swipe 
    $scope.swipeLeft = function () {
       console.log('swipe left 2');
       $scope.imageTransition = new Transitionable([0, 200, 0]);
        $scope.textTransition = new Transitionable([0,300,0]);
        $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
        
       $scope.animateOut();
       $timeout(function () {
          $state.go('slide3');
       },1000);
       
    }
    $scope.swipeRight = function () {
      $scope.imageTransition = new Transitionable([0, 200, 0]);
        $scope.textTransition = new Transitionable([0,300,0]);
        $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
       $scope.animateOut();
       $timeout(function () {
          $state.go('slide3');
       },1000);
    }
})
.controller('Slide3Ctrl',   function ($scope,$state,$cordovaGeolocation,$rootScope, $timeout, $famous){
    //famous
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, -100, 0]);
    $scope.arrowTransition = new Transitionable([0, -100, 0]);
    
    $scope.textTransition  = new Transitionable([0,800,0]);
    $scope.opacity         = new Transitionable(0);
    
    $scope.generateSize = function () { return [100,100]; }
    
    $scope.animateArrowUp = function () {
      $scope.arrowTransition.set([0, 125, 0], {duration:2000, curve: Easing.outExpo})
      $scope.opacity.set(0, {duration: 2000, curve: "easeIn"});
      $timeout(function() {
        $scope.imageTransition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      },3000);
    }

    $scope.animate = function() {
      console.log('animate');
        $scope.textTransition.set([0, 225, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.arrowTransition.set([0, 175, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.imageTransition.set([0, 75, 0], {duration: 1000, curve: Easing.outElastic})
        $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
        $scope.animateArrowUp();
    };
    $scope.animateOut = function() {
      console.log('animate');
        $scope.textTransition.set([0, -300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.arrowTransition.set([0, -300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.imageTransition.set([0, -300, 0], {duration: 1000, curve: Easing.outElastic})
        
        $scope.arrowTransition.set([0, -300, 0], {duration:1000, curve: Easing.outExpo})
        $scope.opacity.set(0, {duration: 900, curve: "easeIn"})
        
        $timeout(function() {
          $scope.imageTransition = new Transitionable([0, -100, 0]);
          $scope.arrowTransition = new Transitionable([0, -100, 0]);
          $scope.textTransition  = new Transitionable([0,900,0]);
          $scope.opacity         = new Transitionable(0);
        },1200);
    };
      // animation begins on page load
      $timeout(function(){
        $scope.animate();
      },50);
    



    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
   

    // swipe 
    $scope.swipeLeft = function () {
       console.log('swipe left');
       $scope.animateOut();
       $timeout(function(){
        $state.go('slide4');
      },700);
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
      $scope.animateOut();
      $timeout(function(){
        $state.go('slide4');
      },700);
    }  
})
.controller('Slide4Ctrl',   function ($scope,$state,$cordovaGeolocation,$rootScope, $window, $timeout, $famous){
    var Engine = $famous['famous/core/Engine'];
    Engine.setOptions({
      appMode:false
    });
    //famous
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.image1Transition = new Transitionable([0, -100, 0]);
    $scope.image2Transition = new Transitionable([0, -100, 0]);
    $scope.image3Transition = new Transitionable([0, -100, 0]);
    // build map layer
    $scope.bg1Transition = new Transitionable([0, -300, 0]);
    $scope.bg2Transition = new Transitionable([0, -300, 0]);
    $scope.bg3Transition = new Transitionable([0, -300, 0]);
    $scope.opacity = new Transitionable(0);

    $scope.textTransition = new Transitionable([0,900,0]);
    $scope.generateSize = function () { return [100,100]; }
    $scope.animate = function() {
      console.log('animate');
      $scope.opacity.set(1, {duration: 2000, curve: "easeIn"})
      $timeout(function(){
        $scope.textTransition.set([0, 300, 0], {duration: 2000, curve: Easing.outExpo})
      },700);
      $timeout(function(){
      $scope.bg1Transition.set([0,150, 0], {duration: 1000, curve: Easing.outElastic})
      },800);
      $timeout(function(){
      $scope.bg2Transition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      },900);
      $timeout(function(){
      $scope.bg3Transition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      },1000);
      $timeout(function(){
      $scope.image1Transition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      },1500);
      $timeout(function(){
      $scope.image2Transition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      },1700);
      $timeout(function(){
      $scope.image3Transition.set([0, 150, 0], {duration: 1000, curve: Easing.outElastic})
      
      },1900);
    };
      // animation begins on page load
    $timeout(function(){
        $scope.animate();
      },500);

    // get users location
    var options = {enableHighAccuracy: true}; // for geolocation
    $scope.getLocation = function () {
      console.log('calling geolocation');
      $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
              $rootScope.lat = position.coords.latitude;
              $rootScope.long = position.coords.longitude;
              //alert($rootScope.current.lat);
              //alert(position)
              console.log($rootScope.lat);
              console.log($rootScope.long);
          });
    }
    //call get users location if not already defined
    if (!$rootScope.lat || !$rootScope.long) {
       $scope.getLocation();
    }
    $scope.animateOut = function () {
      $scope.opacity.set(0, {duration: 500, curve: "easeIn"})
      $scope.textTransition.set([0, -200, 0], {duration: 1000, curve: Easing.outExpo})
      $scope.bg1Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.bg2Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.bg3Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.image1Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.image2Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})
      $scope.image3Transition.set([0, -200, 0], {duration: 1000, curve: Easing.outElastic})

      // $timeout(function() {
      //   $scope.image1Transition = new Transitionable([0, -100, 0]);
      //   $scope.image2Transition = new Transitionable([0, -100, 0]);
      //   $scope.image3Transition = new Transitionable([0, -100, 0]);
      //   // build map layer
      //   $scope.bg1Transition = new Transitionable([0, -300, 0]);
      //   $scope.bg2Transition = new Transitionable([0, -300, 0]);
      //   $scope.bg3Transition = new Transitionable([0, -300, 0]);

      //   $scope.textTransition = new Transitionable([0,900,0]);

      //   $scope.opacity = new Transitionable(0);
      // },1600);
    }
   

    // swipe 
    $scope.swipeLeft = function () {
      $scope.animateOut();
       console.log('swipe left');
       $timeout(function() {
       
        $state.go('end');
         
       },2000);
       
    }
    $scope.swipeRight = function () {
      $scope.animateOut();
       console.log('swipe right');
       $timeout(function() {
        
        $state.go('end');

       },2000);
    }  
})
.controller('FlipCtrl',     function ($scope,$state,$log, $ionicLoading, $window, uiGmapGoogleMapApi, $http, $cordovaGeolocation,$rootScope, $timeout, $famous){
    var Engine = $famous['famous/core/Engine'];
    Engine.setOptions({
      appMode:false
    });
    $scope.chat = function() {
       $state.go('chat');
       $rootScope.chat = true;
       console.log('setting root scope chat to true');
    };

    $ionicLoading.show();
    uiGmapGoogleMapApi.then(function(maps) {
        maps.visualrefresh = true;
        // var sel = document.getElementById('parent');
        // sel.style.display='none';
        // sel.offsetHeight; // no need to store this anywhere, the reference is enough
        // $timeout(function() {
        //   var sel = document.getElementById('parent');
        //   sel.style.display='';
        //   $scope.map.control.refresh();
        //   $scope.map.event.trigger('resize')
        // },1900);
        
        //console.log('refresh');
    });
    if (!$rootScope.lat || !$rootScope.long) {
        $rootScope.lat = 37.751617;
        $rootScope.long = -122.443211;
        $log.log('manually setting root scope');
    }

    $scope.map = {
            control: {},
            show: true,
            center: { latitude: $rootScope.lat, longitude: $rootScope.long },
            zoom: 14,
            events: { 'tilesloaded': function(map, eventName, arguments) { 
                $scope.$apply(function () {
                      google.maps.event.trigger(map, "resize");
                      console.log('refresh');
                  }); 
              } 
            },
            refresh: function () {
              $scope.map.control.refresh({ latitude: $rootScope.lat, longitude: $rootScope.long });
            },
            heatLayerCallback2: function (layer) {
               RealHeatLayer = function (heatLayer) {
                   $log.log('************   calling heat layer  II ***************************************');
                    var map, pointarray, heatmap;
                   console.log('************Taxi Data Orig**********');
                   //console.log($scope.taxiData);
                   $http.get('http://nogo.meteor.com/api/points')
                       .success(function(data,status,header,config){

                           console.log('***Meteor***');
                           console.log(data, status, header, config);
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(data.lat));
                           console.log(JSON.stringify(data.long));
                           console.log('***Meteor***');

                           angular.forEach(data.data, function(value, key){
                               this.push(new google.maps.LatLng(value.lat, value.long));
                           }, $scope.taxiData)


                           $timeout(function() {
                               $ionicLoading.hide();
                           },700);
                       })
                       .error(function(data,status,headers,config){
                           console.log('***Meteor error***');
                           console.log(JSON.stringify(status));
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(headers));
                           console.log(JSON.stringify(config));
                           console.log('***MEteor error***');
                       });
                   var pointArray = new google.maps.MVCArray($scope.taxiData);
                   heatLayer.setData(pointArray);
                }
                $scope.mockHeatLayer = new RealHeatLayer(layer);
                 $scope.map.showHeat2 = '1';
                      $scope.map.showHeat1 = '0';
            },
            heatLayerCallback: function (layer) {
               RealHeatLayer = function (heatLayer) {
                   $log.log('calling heat layer ***************************************************');
                    var map, pointarray, heatmap;

                    //delete this
                    $ionicLoading.hide();

                   $scope.taxiData = [
                      new google.maps.LatLng(37.782551, -122.445368),
                   ];
                   console.log('************Taxi Data Orig**********');
                   console.log($scope.taxiData);

                   $http.get('http://nogo.meteor.com/api/points')
                       .success(function(data,status,header,config){

                           console.log('***Meteor***');
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(data.data));
                           console.log(JSON.stringify(data.long));
                           console.log(JSON.stringify(status));
                           console.log(JSON.stringify(header));
                           console.log(JSON.stringify(config));
                           //console.log("data.lat", data[0].lat);
                           console.log('***Meteor***');

                           angular.forEach(data.data, function(value, key){
                               this.push(new google.maps.LatLng(value.lat, value.long));
                           }, $scope.taxiData)


                           $timeout(function() {
                               $ionicLoading.hide();
                           },900);
                       })
                       .error(function(data,status,headers,config){
                           console.log('*** Meteor error Heat 1***');
                           console.log(data, status, headers, config);
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(status));
                           console.log(JSON.stringify(headers));
                           console.log(JSON.stringify(config));
                           console.log('*** Meteor error Heat 1***');
                       });
                   var pointArray = new google.maps.MVCArray($scope.taxiData);
                   heatLayer.setData(pointArray);
                }
                $scope.mockHeatLayer = new RealHeatLayer(layer);
            },
            options: {
                styles: [ //any style array defined in the google documentation you linked
                    {
                        featureType: "all",
                        stylers: [
                            {saturation: -75},
                            {hue: ""},
                            {lightness: 0}
                        ]
                    }
                    ,{
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            { hue: "#1100ff" },
                            { saturation: -58 },
                            { gamma:.08},
                            { lightness: -6}
                        ]
                    }, {
                        featureType: "road",
                        elementType: "all",
                        stylers: [
                            { visibility: "on" },
                            { hue: ''},
                            { saturation: -100}
                        ]
                    }
                    //,{
                    //    featureType: "poi.business",
                    //    elementType: "labels",
                    //    stylers: [
                    //        { visibility: "on" },
                    //        { hue: '#eb6a5a'}
                    //    ]
                    //}
                ]
            }
        }; // setting scope map inside callback after location found
    var origCenter = {latitude: $rootScope.lat, longitude: $rootScope.long};

    $scope.map.showHeat = '1';
    $scope.map.showHeat2 = '0';

     $scope.map.control.refresh = function () {
        return true;
      };

      $scope.map.toggleView = function (bool) {
        alert('called');
        if (bool == true) {
          map.show = false;
        } else {
          $scope.map.show = false;
        }
        
      }
    $scope.addLocation = function () {
        var options = {enableHighAccuracy: true};
        $scope.map.showHeat2 = '0';
        $scope.map.showHeat1 = '0';
        //show loader
        $ionicLoading.show();
        return $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position) {
                console.log(position);
                 $scope.lat = position.coords.latitude;
                 $scope.long = position.coords.longitude;
                 $rootScope.lat = $scope.lat;
                 $rootScope.long = $scope.long;
                 console.log($scope.lat);
                 console.log($scope.long);

                //{"lat": $scope.lat, "long": $scope.long}
                $http.post('http://nogo.meteor.com/api/points/' + $scope.lat + '/' + $scope.long)
                .success(function(data,status,header,config) {
                    console.log('***Meteor***');
                           console.log(JSON.stringify(status));
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(header));
                           console.log(JSON.stringify(config));
                           console.log('***MEteor***');
                     console.log('Show heat')
                      console.log($scope.map.showHeat2);
                      $scope.map.showHeat2 = '1';
                      $scope.map.showHeat1 = '0';
                      console.log($scope.map.showHeat2);
                    $ionicLoading.hide();
                    
                })
                .error(function(data,status,header,config){
                        console.log('***Meteor error***');
                           console.log(JSON.stringify(status));
                           console.log(JSON.stringify(data));
                           console.log(JSON.stringify(header));
                           console.log(JSON.stringify(config));
                        console.log('***MEteor error***');
                });

            }, function(err){
                //error
                alert("Geolocation Error: " + err);
            });
      };
})
.controller('ChatCtrl',     function ($scope,$rootScope,$state,$cordovaGeolocation,$ionicModal, $ionicLoading, $http, $rootScope, $timeout){
    $scope.chat = function() {
       $state.go('flip');
       $rootScope.chat = false;
       console.log('setting root scope chat to false');
    };
    
    var resetFunction = function () {
      //$scope.messageArray = [];
        $scope.getMessage();
        $timeout(function(){
          if ($rootScope.chat) {
             resetFunction();
          }
        },9000);
    }

    $timeout(function(){
      resetFunction();
    },9000);

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    
    $scope.up = function(message) {
      //alert('Edit Item: ' + message.points);
      ///:lat/:long/:message/:points/:id'
      //$http.post('http://nogo.meteor.com/api/messages', {"id": message.id, "points": message.points, "inc": true})
      $http.post('http://nogo.meteor.com/api/messages/' + $rootScope.lat + "/" + $rootScope.long + '/' + 0 + '/' + 1 + '/' + message.id)
      .success(function(data,status,header,config) {
          console.log('***post success***');
          console.log(data, status, header, config);
          console.log('***post success***');
          
          $ionicLoading.hide();
          //resetFunction();
          if ($scope.$$phase) { // most of the time it is "$digest"
              $scope.getMessage();
          } else {
              $scope.$apply($scope.getMessage);
          }

      })
      .error(function(data,status,header,config){
              console.log('***post error***');
              console.log(data, status, header, config);
              $ionicLoading.hide();
              //alert('There was an error: ' + status);
              console.log('***post error***');
      });
    };
    $scope.down = function(message) {
      //alert('Edit Item: ' + message.points);
      //alert(message.id);
      $http.post('http://nogo.meteor.com/api/messages/' + $rootScope.lat + "/" + $rootScope.long + '/' + 0 + '/' + '-1' + '/' + message.id)
      .success(function(data,status,header,config) {
          console.log('***post success***');
          console.log(data, status, header, config);
          console.log('***post success***');
          
          $ionicLoading.hide();

          if ($scope.$$phase) { // most of the time it is "$digest"
              $scope.getMessage();
          } else {
              $scope.$apply($scope.getMessage);
          }

      })
      .error(function(data,status,header,config){
              console.log('***post error***');
              console.log(data, status, header, config);
              $ionicLoading.hide();
              //alert('There was an error: ' + status);
              console.log('***post error***');
      });
    };

    $ionicModal.fromTemplateUrl('templates/_chat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    })

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    }

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    
    $scope.getMessage = function () {  

      console.log('get messages!');
      $http.get('http://nogo.meteor.com/api/messages/' + $rootScope.lat + "/" + $rootScope.long + '/' + 0 + '/' + 0 + '/' + 0)
       .success(function(data,status,header,config){
          $scope.messageArray = [];
           console.log('***express***');
           console.log(data, status, header, config);
            angular.forEach(data.data, function(value, key){
                 this.push({'message': value.message, 'id': value._id, 'points': value.points, 'date': value.date});
             }, $scope.messageArray)

               $ionicLoading.hide();
           
       })
       .error(function(data,status,headers,config){
           console.log('*** Get Message Error ***');
           console.log(JSON.stringify(data));
           console.log(JSON.stringify(status));
           console.log(JSON.stringify(headers));
           console.log(JSON.stringify(config));
           console.log('*** Get Message Error ***');
       });
    }
    $scope.getMessage();

    $scope.postMessage = function () {
      var message = document.getElementById('message').value;
     if (message.length > 144) {
        alert("Sorry, you're message is too long. 144 character max. Sound familiar?");
     } else {

      $ionicLoading.show();
           var safeMessage = message.replace(/[^a-zA-Z0-9\!\?\#\s\&\.\,\+\-\@\$\'\*]/g, '');
     
            ///:lat/:long/:message/:points/:id'
            //  {
            //   "message": safeMessage, 
            //   "id": "100", 
            //   "points": 0,  
            //   "lat": $rootScope.lat, 
            //   "long": $rootScope.long}
           $http.post('http://nogo.meteor.com/api/messages/' + $rootScope.lat + "/" + $rootScope.long + "/" + safeMessage + '/' + 0 + '/' + 0)
           .success(function(data,status,header,config) {
               console.log('***post success***');
               console.log(data, status, header, config);
               console.log('***post success***');
               
               $ionicLoading.hide();
     
               if ($scope.$$phase) { // most of the time it is "$digest"
                   $scope.getMessage();
               } else {
                   $scope.$apply($scope.getMessage);
               }
     
           })
           .error(function(data,status,header,config){
                   console.log('***post error***');
                   console.log(data, status, header, config);
                   $ionicLoading.hide();
                   alert('There was an error: ' + status);
                   console.log('***post error***');
           });
            document.getElementById('message').value = "";
          }
    }
})

angular.module('ngCordova.plugins.geolocation', [])
.factory('$cordovaGeolocation', ['$q', function ($q) {

    return {
        getCurrentPosition: function (options) {
            var q = $q.defer();

            navigator.geolocation.getCurrentPosition(function (result) {
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        },

        watchPosition: function (options) {
            var q = $q.defer();

            var watchID = navigator.geolocation.watchPosition(function (result) {
                q.notify(result);
            }, function (err) {
                q.reject(err);
            }, options);

            q.promise.cancel = function () {
                navigator.geolocation.clearWatch(watchID);
            };

            q.promise.clearWatch = function (id) {
                navigator.geolocation.clearWatch(id || watchID);
            };

            q.promise.watchID = watchID;

            return q.promise;
        },

        clearWatch: function (watchID) {
            return navigator.geolocation.clearWatch(watchID);
        }
    };
}]);