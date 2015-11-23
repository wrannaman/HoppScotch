angular.module('slider.controllers', [])
.controller('SlideMenuCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        $scope.next = function() {

            if ( $scope.slideIndex == 2) {
                $state.go('app.map')
            }
                $ionicSlideBoxDelegate.next();

        }
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        }
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;

            console.log($scope.slideIndex);
        }
    })
.controller('SlidesCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        //$scope.next = function() {
        //    $ionicSlideBoxDelegate.next();
        //}
        //$scope.previous = function () {
        //    $ionicSlideBoxDelegate.previous();
        //}
        //$scope.slideChanged = function(index) {
        //    $scope.slideIndex = index;
        //    if ($scope.slideIndex == 3) {
        //        $state.go('/app/map')
        //    }
        //    console.log($scope.slideIndex);
        //}

    });

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $log, $cordovaGeolocation, $q, uiGmapGoogleMapApi){
    $scope.map = {

            center: { latitude: 37.774546, longitude: -122.433523 },
            zoom: 13,
            showHeat: true,
            heatLayerCallback: function (layer) {
                $scope.mockHeatLayer = new MockHeatLayer(layer);
                
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
    //$scope.map.heatLayerCallback = function () {
    //    alert('heat layer callback');
    //    var options = {enableHighAccuracy: true};
    //    return $cordovaGeolocation.getCurrentPosition(options)
    //        .then(function(position) {
    //            $scope.map.lat = position.coords.latitude;
    //            $scope.map.long = position.coords.longitude;
    //            console.log($scope.map.lat);
    //            console.log($scope.map.long);
    //            //$scope.map.center.latitude= $scope.map.lat;
    //            //$scope.map.center.longitude= $scope.map.long;
    //
    //
    //
    //        }, function(err){
    //            //error
    //            alert(err);
    //        });
    //}

    $scope.addLocation = function () {
        var options = {enableHighAccuracy: true};
        return $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position) {
                 $scope.map.lat = position.coords.latitude;
                 $scope.map.long = position.coords.longitude;
                console.log($scope.map.lat);
                console.log($scope.map.long);
                console.log($scope.mockHeatLayer)

            }, function(err){
                //error
                alert(err);
            });

    };

    uiGmapGoogleMapApi.then(function(maps) {

    });
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