var markers = [
  ['1', 43.048442, -76.150941],
  ['2', 43.047975, -76.150935],
  ['3', 43.047537, -76.150679],
  ['4', 43.047241, -76.150729],
  ['5', 43.047158, -76.148388],
  ['6', 43.048079, -76.152065],
  ['7', 43.050719, -76.150677],
  ['8', 43.048065, -76.149233],
  ['9', 43.046977, -76.152032],
  ['10', 43.049803, -76.149648],
  ['11', 43.046100, -76.152154],
  ['12', 43.049607, -76.146850],
  ['13', 43.046980, -76.151249],
  ['14', 43.046710, -76.150730],
  ['15', 43.048496, -76.152400],
  ['16', 43.048103, -76.153469],
  ['17', 43.049371, -76.150898],
  ['18', 43.048773, -76.151653],
  ['19', 43.050263, -76.149405],
  ['20', 43.044240, -76.149061],
  ['21', 43.048943, -76.152074],
  ['22', 43.048792, -76.153071],
  ['23', 43.048631, -76.152751],
  ['24', 43.049175, -76.153906],
  ['25', 43.047713, -76.153477],
  ['26', 43.047524, -76.154435],
  ['27', 43.050318, -76.150694],
  ['28', 43.048184, -76.147819],
  ['29', 43.048350, -76.153455]
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
    }, 8000);
}
google.maps.event.addDomListener(window, 'load', initialize);