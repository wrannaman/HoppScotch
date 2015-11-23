angular.module('slider.controllers', ['ngTouch'])
.controller('SlideMenuCtrl', function ($scope, $rootScope, $state, $cordovaGeolocation, $ionicSlideBoxDelegate) {
        var options = {enableHighAccuracy: true};
        $rootScope.slideIndex = 0;
        $scope.next = function() {

            if ( $scope.slideIndex == 2) {
                $state.go('app.map');
            }
            if ($scope.slideIndex == 1 || $scope.slideIndex == 2) {
                $scope.getLocation();
            }
                $ionicSlideBoxDelegate.next();

        }
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        }
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
            $rootScope.slideIndex = index;
            console.log($scope.slideIndex);
            $scope.getLocation();
        }
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
        
    })
.controller('Slide1Ctrl', function ($scope, $timeout, $famous){
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, -100, 0]);
    $scope.textTransition = new Transitionable([0,900,0]);

    $scope.generateSize = function () {
      return [100,100];
    }
    $scope.animate = function() {
      console.log('animate');
      $timeout(function(){
        $scope.textTransition.set([0, 300, 0], {duration: 2000, curve: Easing.outExpo})
      },700);
      $timeout(function(){
      $scope.imageTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1400);
    };
    $scope.animate();
    $scope.enter = function () {
      console.log('enter');
    }
    $scope.leave = function () {
      console.log('leave');
    }
    $scope.halt = function () {
      console.log('halt');
    }
    $scope.touchEndCount = 0;
    $scope.touchEnd = function ($event) {
      console.log($event);
      $scope.touchEndCount++;
    }
    $scope.swipeLeft = function () {
          console.log('swipe left');
          alert('swipeleft');
        }
})
.controller('Slide2Ctrl', function ($scope, $rootScope, $timeout, $famous){
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    $scope.imageTransition = new Transitionable([0, -100, 0]);
    $scope.textTransition = new Transitionable([0,900,0]);

    $scope.generateSize = function () {
      return [100,100];
    }
    $scope.animate = function() {
      console.log('animate');
      $timeout(function(){
        $scope.textTransition.set([0, 300, 0], {duration: 2000, curve: Easing.outExpo})
      },700);
      $timeout(function(){
      $scope.imageTransition.set([0, 200, 0], {duration: 1000, curve: Easing.outElastic})
      },1400);
    };
    console.log("*********************");
    console.log($rootScope.slideIndex);
    if ($rootScope.slideIndex == 1) {
      console.log($rootScope.slideIndex);

      $scope.animate();
    }
    
})
.controller('SlidesCtrl', function ($scope, $state, $ionicSlideBoxDelegate) { });

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
.controller('PlaylistsCtrl', function($scope, $state, $timeout) {
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
    },1000);
})
.controller('MapCtrl', function($scope, $rootScope,$state, $log, $ionicLoading, $timeout, $cordovaGeolocation, $http, uiGmapGoogleMapApi) {
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

            $http.post('http://192.168.1.122:3000/setpoints', {"lat": $scope.lat, "long": $scope.long})
            .success(function(data,status,header,config) {
                console.log('***post success***');
                console.log(data, status, header, config);
                //google.maps.event.trigger( $scope.map, 'resize');
                console.log('***post success***');
                //$scope.map.refresh()
                document.getElementById("parent").parentNode.removeChild(document.getElementById("parent"));
                $state.go('app.playlists');
                //hide loader
                $ionicLoading.hide();
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
        });};
});

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