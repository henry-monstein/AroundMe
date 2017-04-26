var test = '[' + 
  '{' + 
    '"location" : ["53.903771", "27.572561"],' +
    '"title" : "Park",' +
    '"author" : "MyName",' +
    '"moody" : "1",' +
    '"image" : "./img/Ix13ifixEsY.jpg",' +
    '"likes" : 5000' +
  '},' + 
  '{' +
   '"location" : ["53.920619", "27.598477"],' +
    '"title" : "Academy",' +
    '"author" : "MyName",' +
    '"moody" : "3",' +
    '"image" : "./img/Ix13ifixEsY.jpg",' +
    '"likes" : 9999' +
  '},' +
  '{' +
    '"location" : ["53.902258", "27.561792"],' +
    '"title" : "Minsk",' +
    '"author" : "MyName",' +
    '"moody" : "2",' +
    '"image" : "./img/Ix13ifixEsY.jpg",' +
    '"likes" : 1300' +
  '}' +
']';
test = JSON.parse(test);
var vidget = document.getElementById('vidget');
var mapd = document.createElement('div');
mapd.id = "map";
vidget.appendChild(mapd);
var map;
var markers = [];
var pos={lat : 53.902258, lng : 27.561792};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center : pos
  });
  // Try HTML5 geolocation.
  var infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  }
  for(var i = 0; i < test.length; i++) {
    markers[i] = new google.maps.Marker({
      position : new google.maps.LatLng(test[i].location[0], test[i].location[1]),
      label: i+'',
      animation: google.maps.Animation.DROP,
      title : test[i].title
    });
    markers[i].addListener('click', toggleBounce);
    markers[i].setMap(map);
  }
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
// event list code
function Events(options) {
  var elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    elem = document.createElement('section');
    elem.className = "list";

    var titleElem = document.createElement('span');
    elem.appendChild(titleElem);
    titleElem.className = "title";
    titleElem.textContent = options.title;

    elem.onmousedown = function() {
      return false;
    };

    elem.onclick = function(event) {
      if (event.target.closest('.title')) {
        toggle();
      }
    }

  }
  function renderItems() {
    var items = options.items || [];
    var events = document.createElement('div');
    events.id = "events";
    items.forEach(function(item) {
      var post = document.createElement('div');
      post.className = "post";
      events.appendChild(post);
      var user = document.createElement('div');
      user.textContent = item.author;
      user.className = "user";
      var image = document.createElement('div');
      image.className = "image";
      var location = document.createElement('div');

      location.textContent = item.location + "";
      location.className = "location";
      var moody = document.createElement('div');
      moody.textContent = item.moody;
      moody.className = "moody";
      var like = document.createElement('div');
      like.className = "like";
      post.appendChild(like);
      post.insertBefore(moody, like);
      post.insertBefore(location, moody);
      post.insertBefore(image, location);
      post.insertBefore(user, image);
      var img = document.createElement('img');
      img.setAttribute('scr', item.image)
      image.appendChild(img);
      var alike = document.createElement('a');
      alike.setAttribute('href', "#")
      alike.textContent = "Likes " + item.likes;
      like.appendChild(alike);
      var likeimg = document.createElement('img');
      likeimg.setAttribute('scr', "./img/like.png")
      alike.appendChild(likeimg);
    });
    elem.appendChild(events);
  }

  function open() {
    if (!elem.querySelector('div')) {
      renderItems();
    }
    elem.classList.add('open');
  };

  function close() {
    elem.classList.remove('open');
  };

  function toggle() {
    if (elem.classList.contains('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}
var events = new Events({
  title: "",
    items: test
});
vidget.insertBefore(events.getElem(), mapd);