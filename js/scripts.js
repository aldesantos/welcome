var markers = [
  ['1', 43.0484409, -76.153266],
  ['2', 43.0479779, -76.1531237],
  ['3', 43.047521, -76.1526407],
  ['4', 43.0484633, -76.1523746],
  ['5', 43.0471553, -76.1503989],
  ['6', 43.0480819, -76.1540803],
  ['7', 43.0507161, -76.1528009],
  ['8', 43.048065, -76.1511768],
  ['9', 43.0480646, -76.1577429],
  ['10', 43.0497797, -76.1517984],
  ['11', 43.0460608, -76.1539845],
  ['12', 43.0496948, -76.1490301],
  ['13', 43.0469134, -76.1534349],
  ['14', 43.0467291, -76.152735],
  ['15', 43.0485087, -76.1546932],
  ['16', 43.048107, -76.1556186],
  ['17', 43.0493254, -76.1531891],
  ['18', 43.0488041, -76.1538309],
  ['19', 43.05027, -76.1512597],
  ['20', 43.0442185, -76.1512512],
  ['21', 43.0489272, -76.1542203],
  ['22', 43.0490442, -76.1555394],
  ['23', 43.0485177, -76.0549748],
  ['24', 43.049158, -76.1562287],
  ['25', 43.0477076, -76.1556241],
  ['26', 43.0475533, -76.1566074],
  ['27', 43.0503805, -76.1523274],
  ['28', 43.0483201, -76.1500379],
  ['29', 43.048363, -76.1556107]
];  

function initialize() {
    
  var center = {lat: 43.0483201, lng: -76.1489462},
      map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        center: center,
        zoom: 18
  });
 var flightPlanCoordinates = [
    {lat: 43.048572, lng: -76.148123},
    {lat: 43.048572, lng: -76.147600},
    {lat: 43.048015, lng: -76.147600},
    {lat: 43.048015, lng: -76.148123},
	 {lat: 43.048572, lng: -76.148123}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#019cde',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });	
	flightPath.setMap(map);
  var Markers = [];
  
  var iconNormal = 'https://i.stack.imgur.com/AAsD3.png',
      iconSelected = 'https://webdesign.danols.com/static/template/images/icons/light/pin_map_icon&48.png',
      bounds = new google.maps.LatLngBounds();
  function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          myLatLng = new google.maps.LatLng(marker[1], marker[2]),
          eachMarker = new google.maps.Marker({
            record_id: i,
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconNormal,
            title: marker[0]
      });
      //var selectedMarker;
      bounds.extend(myLatLng);
      Markers.push(eachMarker);
	  map.setZoom(18);
     /* google.maps.event.addListener(eachMarker,'click', function() {
        changeIcon(this);
      });

      function changeIcon(e){
        if (selectedMarker) {
          selectedMarker.setIcon(iconNormal);
        }
        e.setIcon(iconSelected);
        selectedMarker = e;
      }*/
      
      // choose from list
      jQuery('.overlays li').on('click', function(){
		  $('.overlays li').hide();
        mapItem = $(this).index();
        changeMarker(mapItem);                             
        var thisLat = markers[mapItem] [1],
            thisLon = markers[mapItem] [2];
        map.panTo({lat: thisLat, lng: thisLon});
		  $(this).toggle();
      });

      function changeMarker(record_id){
        for (i in Markers){
          Markers[i].setIcon(iconNormal);
          Markers[record_id].setIcon(iconSelected);
        }
      }
    }
  }
	var noPoi = [
{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]   
  }
];
map.setOptions({styles: noPoi});
  setMarkers(map);   
	currentHighlight = 0;
  setInterval(function() {
      var lis = document.getElementsByClassName('act');
      lis[currentHighlight].click();
        currentHighlight = (currentHighlight + 1) % lis.length;
    }, 5000);
}
google.maps.event.addDomListener(window, 'load', initialize);