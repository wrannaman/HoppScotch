angular.module('slider.controllers', ['ngTouch'])
.controller('StartCtrl', function ($scope, $rootScope, $cordovaGeolocation, $state, $timeout, $famous){
    //famous
    console.log('start');
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    $scope.textTransition = new Transitionable([0, 600, 0]);
    $scope.text2Transition = new Transitionable([0, 600, 0]);
    
    $scope.opacity = new Transitionable(0);
    $scope.textOpacity = new Transitionable(0);


    $scope.animate = function() {
      console.log('animate');
      $timeout(function(){
        $scope.textShow = false;
        $scope.textTransition.set([0, 300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.text2Transition.set([0, 300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.opacity.set(1, {duration: 100, curve: "easeIn"})
        $scope.textOpacity.set(1, {duration: 500, curve: "easeIn"})
      },900);
      $timeout(function() {
        $scope.textShow = true;
        $scope.textTransition.set([100, 300, 0], {duration: 1000, curve: Easing.outExpo})
        $scope.text2Transition.set([-100, 300, 0], {duration: 1000, curve: Easing.outExpo})
      },900);
    };
    $scope.selection = function (choice) {
      if (choice == 'learn') {
        alert('learn')
        $state.go('slide1')
      } else {
        $state.go('app.map')
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
        $state.go('slide1');
      }

      console.log('swipe left 1');
      
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
     $scope.increment--;
     console.log('scope increment', $scope.increment);
      if ($scope.increment == 1) {
        $scope.animate2();
      }
      if ($scope.increment == 2) {
        $scope.animate3();
      }
      if ($scope.increment == 3) {
        $state.go('slide1');
        $timeout(function () {
          $scope.animate();
          $scope.animate2();
          $scope.animcate3();
        },2000);
      }
    }
})
.controller('Slide1Ctrl', function ($scope, $rootScope, $cordovaGeolocation, $state, $timeout, $famous){
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
      $timeout(function(){
        $scope.textTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outExpo})
      },1000);
      $timeout(function(){
      $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
      $scope.imageTransition.set([0, 100, 0], {duration: 1000, curve: Easing.outExpo})
      },900);
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
          $scope.textTransition.set([0, 250, .5], {duration: 1000, curve: Easing.outExpo})
          $scope.imageTransition.set([0, 150, .5], {duration: 1000, curve: Easing.outExpo})
          
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
        $state.go('slide2');
      }

      console.log('swipe left 1');
      
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
     $scope.increment--;
     console.log('scope increment', $scope.increment);
      if ($scope.increment == 1) {
        $scope.animate2();
      }
      if ($scope.increment == 2) {
        $scope.animate3();
      }
      if ($scope.increment == 3) {
        $state.go('slide1');
        $timeout(function () {
          $scope.animate();
          $scope.animate2();
          $scope.animcate3();
        },2000);
      }
    }
})
.controller('Slide2Ctrl', function ($scope,$state,$cordovaGeolocation,$rootScope, $timeout, $famous){
    //famous
    console.log('slide2');
    console.log('scope increment', $scope.increment);
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, 250, 0]);
    $scope.textTransition = new Transitionable([0, 350,0]);
    $scope.opacity = new Transitionable(0);

    $scope.generateSize = function () { return [100,100]; }
    $scope.animate = function() {
      console.log('animate 2 ');
      $timeout(function(){
        $scope.textTransition.set([0, 300, 0], {duration: 1000, curve: Easing.outExpo})
      },1000);
      $timeout(function(){
      $scope.opacity.set(1, {duration: 1000, curve: "easeIn"})
      $scope.imageTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outExpo})
      },900);
    };
      // animation begins on page load
      $timeout(function() {
        $scope.animate();
      },1000);
    

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

    // swipe 
    $scope.swipeLeft = function () {
       console.log('swipe left 2');
       $scope.imageTransition = new Transitionable([0, 200, 0]);
        $scope.textTransition = new Transitionable([0,300,0]);
        $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
        $scope.animateOut = function() {
          console.log('animate Out 2');
          
          $timeout(function(){
            $scope.textTransition.set([0, 350, 0], {duration: 1000, curve: Easing.outExpo})
          },300);
          $timeout(function(){
            
            $scope.imageTransition.set([0, 250, 0], {duration: 1000, curve: Easing.outExpo})
          },500);
        };
       $scope.animateOut();
       $timeout(function () {
          $state.go('slide3');
       },1500);
       
    }
    $scope.swipeRight = function () {
      $scope.imageTransition = new Transitionable([0, 200, 0]);
        $scope.textTransition = new Transitionable([0,300,0]);
        $scope.opacity.set(0, {duration: 1000, curve: "easeIn"})
        $scope.animateOut = function() {
          console.log('animate Out 2');
          
          $timeout(function(){
            $scope.textTransition.set([0, 350, 0], {duration: 1000, curve: Easing.outExpo})
          },300);
          $timeout(function(){
            
            $scope.imageTransition.set([0, 250, 0], {duration: 1000, curve: Easing.outExpo})
          },500);
        };
       $scope.animateOut();
       $timeout(function () {
          $state.go('slide1');
       },1000);
    }
})
.controller('Slide3Ctrl', function ($scope,$state,$cordovaGeolocation,$rootScope, $timeout, $famous){
    //famous
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, -100, 0]);
    $scope.textTransition = new Transitionable([0,900,0]);
    $scope.generateSize = function () { return [100,100]; }
    $scope.animate = function() {
      console.log('animate');
      $timeout(function(){
        $scope.textTransition.set([0, 300, 0], {duration: 2000, curve: Easing.outExpo})
      },700);
      $timeout(function(){
      $scope.imageTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1400);
    };
      // animation begins on page load
    $scope.animate();

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
       $state.go('slide4');
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
      $state.go('slide2')
    }  
})
.controller('Slide4Ctrl', function ($scope,$state,$cordovaGeolocation,$rootScope, $timeout, $famous){
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
        $scope.textTransition.set([0, 400, 0], {duration: 2000, curve: Easing.outExpo})
      },700);
      $timeout(function(){
      $scope.bg1Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },800);
      $timeout(function(){
      $scope.bg2Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },900);
      $timeout(function(){
      $scope.bg3Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1000);
      $timeout(function(){
      $scope.image1Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1500);
      $timeout(function(){
      $scope.image2Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1700);
      $timeout(function(){
      $scope.image3Transition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      
      },1900);
    };
      // animation begins on page load
    $scope.animate();

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
      $scope.opacity.set(0, {duration: 500, curve: "easeIn"})
      $scope.textTransition.set([0, 500, 0], {duration: 2000, curve: Easing.outExpo})
      $scope.bg1Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      $scope.bg2Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      $scope.bg3Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      $scope.image1Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      $scope.image2Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      $scope.image3Transition.set([0, 500, 0], {duration: 2000, curve: Easing.outElastic})
      

       console.log('swipe left');
       $timeout(function() {
        $state.go('app.map');
       },2000);
       
    }
    $scope.swipeRight = function () {
      console.log('swipe right');
      $state.go('slide3')
    }  
})

angular.module('app.controllers', ['ngCordova.plugins.geolocation'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('PlaylistsCtrl', function($scope, $rootScope, $state, $timeout) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
    $timeout(function() {
         $state.go('app.map');
    },1500);
})
.controller('MapCtrl', function($scope, $rootScope,$state, $log, $ionicLoading,$window, $timeout, $cordovaGeolocation, $http, uiGmapGoogleMapApi) {
    $ionicLoading.show();
    uiGmapGoogleMapApi.then(function(maps) {
        maps.visualrefresh = true;
    });


    if (!$rootScope.lat || !$rootScope.long) {
        $rootScope.lat = 37.751617;
        $rootScope.long = -122.443211;
        $log.log('manually setting root scope');
    }

    $scope.map = {
            control: {},
            center: { latitude: $rootScope.lat, longitude: $rootScope.long },
            zoom: 14,
            showHeat: true,
            //refresh: function() {
            //    return $scope.map.control.refresh();
            //},
            heatLayerCallback: function (layer) {
               RealHeatLayer = function (heatLayer) {
                   $log.log('calling heat layer ***************************************************');
                    var map, pointarray, heatmap;
                   $scope.taxiData = [
                       //new google.maps.LatLng(37.751617, -122.443211),
                       //new google.maps.LatLng(37.751496, -122.443246),
                       //new google.maps.LatLng(37.750733, -122.443428),
                       //new google.maps.LatLng(37.750126, -122.443536),
                       //new google.maps.LatLng(37.750103, -122.443784),
                       //new google.maps.LatLng(37.750390, -122.444010),
                       //new google.maps.LatLng(37.750448, -122.444013),
                       //new google.maps.LatLng(37.750536, -122.444040),
                       //new google.maps.LatLng(37.750493, -122.444141),
                       //new google.maps.LatLng(37.790859, -122.402808)
                   ];
                   console.log('************Taxi Data Orig**********');
                   console.log($scope.taxiData);
                   $http.get('http://192.168.1.122:3000/getpoints')
                       .success(function(data,status,header,config){

                           console.log('***express***');
                           console.log(data, status, header, config);
                           //console.log("data.lat", data[0].lat);
                           console.log('***express***');

                           angular.forEach(data, function(value, key){
                               this.push(new google.maps.LatLng(value.lat, value.long));
                           }, $scope.taxiData)


                           $timeout(function() {
                               $ionicLoading.hide();
                           },500);
                       })
                       .error(function(data,status,headers,config){
                           console.log('***express error***');
                           console.log(data, status, headers, config);
                           console.log('***express error***');
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
    $scope.map.resizeMap = function () {
        $timeout(function() {
           //$scope.map.refreshMap(false)
           // $log.log('set refresh to false');
        },5000);}
    $scope.addLocation = function (heatlayer) {
        var options = {enableHighAccuracy: true};
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

                $http.post('http://192.168.1.122:3000/setpoints', {"lat": 37.751617, "long": -122.443211})
                .success(function(data,status,header,config) {
                    console.log('***post success***');
                    console.log(data, status, header, config);
                    //google.maps.event.trigger( $scope.map, 'resize');
                    console.log('***post success***');
                    //$scope.map.refresh()
                    //document.getElementById("parent").parentNode.removeChild(document.getElementById("parent"));

                    $rootScope.whichMap = 1;
                    console.log('***which map***');
                    console.log($rootScope.whichMap);
                    console.log('***which map***');
                    
                    //$state.go('app.playlists');
                    //hide loader
                    $ionicLoading.hide();
                    $window.location.reload();
                })
                .error(function(data,status,header,config){
                        console.log('***post error***');
                        console.log(data, status, header, config);
                        $ionicLoading.hide();
                        alert('There was an error: ' + status);
                        console.log('***post error***');
                });

            }, function(err){
                //error
                alert("Geolocation Error: " + err);
            });
      };
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