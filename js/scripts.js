var markers = [
  ['1', 43.0483658, -76.1506301],
  ['2', 43.0479779, -76.153129],
  ['3', 43.0478483, -76.1502277],
  ['4', 43.0478464, -76.1494123],
  ['5', 43.0478464, -76.1494123],
  ['6', 43.047853, -76.1509318],
  ['7', 43.0507161, -76.1528009],
  ['8', 43.0483201, -76.1478492],
  ['9', 43.0478657, -76.1507971],
  ['10', 43.0483658, -76.1506301],
  ['11', 43.04698936, -76.1512641],
  ['12', 43.0486032, -76.1489276],
  ['13', 43.0469173, -76.1534402],
  ['14', 43.0467291, -76.1527403],
  ['15', 43.0480461, -76.1514194],
  ['16', 43.0471836, -76.1514677],
  ['17', 43.0483658, -76.1506301],
  ['18', 43.0488041, -76.1538362],
  ['19', 43.0491672, -76.1498852],
  ['20', 43.0442176, -76.148834],
  ['21', 43.0489292, -76.1531286],
  ['22', 43.0480461, -76.1514194],
  ['23', 43.0485216, -76.1549801],
  ['24', 43.0487509, -76.1522362],
  ['25', 43.0481313, -76.1520798],
  ['26', 43.0475533, -76.1566127],
  ['27', 43.0503805, -76.1523327],
  ['28', 43.0482971, -76.1474216],
  ['29', 43.0487509, -76.1522362]
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