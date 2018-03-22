
//Javascript functions for homepage with map

var meetingMarkers = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0522, lng: -118.2437},
    zoom: 13,
    mapTypeId: 'roadmap',
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  })
  var infoWindow = new google.maps.InfoWindow;

  //initially disable add meeting button
  document.getElementById("addMeetingButton").disabled = true;
  document.getElementById("addMeetingButton").style.visibility = 'hidden';

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      document.getElementById("addMeetingButton").disabled = true;
      return;
    }

    //enable add meeting button after search
    document.getElementById("addMeetingButton").disabled = false;
    document.getElementById("addMeetingButton").style.visibility = 'visible';

    // Clear out the old markers.
    /*markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];*/

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      meetingMarkers.push(new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        title: place.name,
        position: place.geometry.location
      }));

      console.log(place.name);
      console.log(place.formatted_address);
      console.log(place.vicinity);
      //called vicinity but changed to name
      sessionStorage.setItem('vicinity', place.name);
      sessionStorage.setItem('address', place.formatted_address);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

  });

  // create current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);

      infoWindow.setContent('My Location');
      

      map.setCenter(pos);

      var marker = new google.maps.Marker({
          position: pos,
          map: map,
          animation: google.maps.Animation.DROP
      });

      marker.addListener('click', function() {
        infoWindow.open(map,marker);
      });

      var pings = document.getElementsByClassName("pings");
      for( var i = 0; i < pings.length; i++ ) {
        var searchString = pings[i].id;
        var meetTime = pings[i].innerHTML;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address':searchString
        },function (result,status) {
          if (status == 'OK') {
            var meetinginfoWindow = new google.maps.InfoWindow;
            //meetinginfoWindow.setContent("You have a meeting at " + searchString + ", at " + meetTime);
            meetinginfoWindow.setContent("You have a meeting here, check meetings created for info");
            map.setCenter(result[0].geometry.location);
            var marker = new google.maps.Marker({
              map:map,
              position: result[0].geometry.location,
              animation: google.maps.Animation.DROP
            });
            marker.addListener('click', function() {
              meetinginfoWindow.open(map,marker);
            });

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

      
      // create location based on meeting set
        /*$.getJSON("../json/meetingsCreated.json", function(meetings) {
        console.log(Object.keys(meetings.meetingsCreated).length);
        var searchString = meetings.meetingsCreated[0].meetingLocation;
        var meetTime = meetings.meetingsCreated[0].time;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': searchString
        }, function (result, status) {
          if (status == 'OK') {
            var meetinginfoWindow = new google.maps.InfoWindow;
            meetinginfoWindow.setContent("You have a meeting at " + searchString +", at " + meetTime );
            map.setCenter(result[0].geometry.location);
            var marker2 = new google.maps.Marker({
                map: map,
                position: result[0].geometry.location,
                animation: google.maps.Animation.DROP
            });
            marker2.addListener('click', function() {
              meetinginfoWindow.open(map, marker2);
            });
            meetingMarkers.push(marker2);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });

      });*/
      

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                 'Error: The Geolocation service failed.' :
                 'Error: Your app doesn\'t support geolocation.');
  infoWindow.open(map);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
document.getElementById("addMeetingButton").addEventListener("click",function(){
  //console.log("addMeeting");
  var input = document.getElementById('pac-input').value;
  //var searchBox = new google.maps.places.SearchBox(input);
  //var places = searchBox.getPlaces();
  if (input == '') {
      alert("You need to search a location first!");
  } else {
    window.location.href = "/createMeeting";
  }
});

/* When the user clicks on the button Profile,
 go to the profile page*/
document.getElementById("profileButton").addEventListener("click",function(){
  window.location.href = "profileB.html";
});

document.getElementById("FriendsButton").addEventListener("click", function(){
  window.location.href = "/friendsB";
});

document.getElementById("MeetingButton").addEventListener("click", function(){
  window.location.href = "/meetingsCreatedJoinedB";
});

//Wizard of Oz meeting triggers if session var set
var activeMeeting = sessionStorage.getItem('activeMeeting');
var ten = sessionStorage.getItem('ten');
var five = sessionStorage.getItem('five');
var two = sessionStorage.getItem('two');
var friendName = sessionStorage.getItem('friendName');
console.log(activeMeeting);
  console.log(ten);
  console.log(five);
  console.log(two);

if(activeMeeting == 'true') {
  sessionStorage.setItem('activeMeeting', 'false');  
  
  if(window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    //ten minute notification  
    if(ten == 'true') {
      setTimeout(function(){
        var n = new Notification('RUHereYet', { 
          body: friendName + ' is 10 minutes away!',
        }); 
        var audio = new Audio('../Rings/ten_min.mp3');
        audio.play();
      }, 5000);
    }

    //five minute notification
    if(five == 'true') {
      setTimeout(function(){
        var n = new Notification('RUHereYet', { 
          body: friendName + ' is 5 minutes away!',
        }); 
        var audio = new Audio('../Rings/five_min.mp3');
        audio.play();
      }, 10000);
    }

    //two minute notification
    if(two == 'true') {
      setTimeout(function(){
        var n = new Notification('RUHereYet', { 
          body: friendName + ' is 2 minutes away!',
        }); 
        var audio = new Audio('../Rings/two_min.wav');
        audio.play();
      }, 15000);
    }
  }
}