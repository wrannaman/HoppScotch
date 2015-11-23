angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})
.controller('PlaylistsCtrl', function($scope) {
})
.controller('PlacesCtrl', function($scope, $stateParams, $timeout, searchResults) {
  $scope.places = searchResults;
  console.log('** search Results **');
  for( var i=0; i<$scope.places.length; i++) {
    console.log($scope.places[i].name)
  }
})
.controller('MapCtrl', function($state, $scope, $stateParams, $timeout, searchResults) {
  var map;
  $scope.searchResults = searchResults;

  $scope.init = function(){
      var mapOptions = {
          center: new google.maps.LatLng(37.774546, -122.433523),
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          navigationControl: true,
          scrollwheel: false,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP,
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
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // heatMap
      var pointArray = new google.maps.MVCArray(taxiData);
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      });
      heatmap.setMap(map);
      google.maps.event.addListener(map, 'click', function (event) {
        $scope.clickedLat = event.latLng.lat();
        $scope.clickedLng = event.latLng.lng()
        //alert( "Latitude: "+$scope.clickedLat+" "+", longitude: "+$scope.clickedLng ); 
        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng($scope.clickedLat, $scope.clickedLng),
            new google.maps.LatLng(37.744546, -122.433523));
          searchBox.setBounds(bounds)
          var pyrmont = new google.maps.LatLng($scope.clickedLat, $scope.clickedLng);
          var request = {
              location: pyrmont,
              radius: 500,
              types: ['night_club', 'bar']
            };
          function callback(results, status) {
            //$scope.searchResults = [];
            console.log($scope.searchResults.length);
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  //console.log(JSON.stringify(results[i]));
                  //console.log(JSON.stringify(results[i].name));
                  //console.log(JSON.stringify(results[i].vicinity));
                  $scope.searchResults.push({'name': results[i].name, 'address': results[i].vicinity})
                }
                $timeout(function() {
                  $state.go('app.places');
                },3000);
                // $timeout(function () {
                //   for (var i = 0; i < $scope.searchResults.length; i++) {
                //     console.log($scope.searchResults[i].name)
                //   }
                // }, 2000)
                
              }
            }
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
      });  

        var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.794546, -122.433523),
        new google.maps.LatLng(37.744546, -122.433523));
        map.fitBounds(defaultBounds);

        // Create the search box and link it to the UI element.
        var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var searchBox = new google.maps.places.SearchBox(
          /** @type {HTMLInputElement} */(input));

        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(searchBox, 'places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
          for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
          }

          // For each place, get the icon, place name, and location.
          markers = [];
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0, place; place = places[i]; i++) {
            var image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
          }

          map.fitBounds(bounds);
        });

        // Bias the SearchBox results towards places that are within the bounds of the
        // current map's viewport.
        google.maps.event.addListener(map, 'bounds_changed', function() {
          var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng($scope.clickedLat, $scope.clickedLng),
            new google.maps.LatLng(37.744546, -122.433523));
          searchBox.setBounds(bounds)
        });

        var pyrmont = new google.maps.LatLng($scope.clickedLat, $scope.clickedLng);
        var request = {
            location: pyrmont,
            radius: 500,
            types: ['restaurant,night_club,lodging,food,bar,casino,campground,art_gallery,amusement_park']
          };
        function callback(results, status) {

            if (status == google.maps.places.PlacesServiceStatus.OK) {
              console.log(results.length);
              for (var i = 0; i < results.length; i++) {
                //console.log(JSON.stringify(results[i]));

                console.log(JSON.stringify(results[i].name));
                //console.log(JSON.stringify(results[i].vicinity));
              }
            }
          }
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);  


         var gradient = [
          
        ]
        heatmap.set(gradient);
  } 

  function toggleHeatmap() {
    heatmap.setMap(map);
  }
     
  function getGeoLocation(){
      var success = function(position){
          map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      }
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, null);
      }   
  } 

  var pointarray, heatmap;

  var taxiData = [
    new google.maps.LatLng(37.765139, -122.405139),
  new google.maps.LatLng(37.764457, -122.405094),
  new google.maps.LatLng(37.763716, -122.405142),
  new google.maps.LatLng(37.762932, -122.405398),
  new google.maps.LatLng(37.762126, -122.405813),
  new google.maps.LatLng(37.761344, -122.406215),
  new google.maps.LatLng(37.760556, -122.406495),
  new google.maps.LatLng(37.759732, -122.406484),
  new google.maps.LatLng(37.758910, -122.406228),
  new google.maps.LatLng(37.758182, -122.405695),
  new google.maps.LatLng(37.757676, -122.405118),
  new google.maps.LatLng(37.757039, -122.404346),
  new google.maps.LatLng(37.756335, -122.403719),
  new google.maps.LatLng(37.755503, -122.403406),
  new google.maps.LatLng(37.754665, -122.403242),
  new google.maps.LatLng(37.753837, -122.403172),
  new google.maps.LatLng(37.752986, -122.403112),
  new google.maps.LatLng(37.751266, -122.403355)
  ]; 
  taxiData.push( new google.maps.LatLng(37.782551, -122.445368) );
});
