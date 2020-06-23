// Store our API endpoint inside earthquakeUrl
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var platesurl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// Perform a GET request to the earthquake URL and platesurl
d3.json(earthquakeUrl, function(data) {
  var earthquakeData = data;
  d3.json(platesurl, function(x){
    var faultlinesData = x;
    createFeatures(earthquakeData, faultlinesData)
  })
});



function createFeatures(earthquakeData, faultlinesData) {

  var earthquakes = L.geoJSON(earthquakeData, {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
 onEachFeature : function (feature, layer) {

    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
    },     
  pointToLayer: function (feature, latlng) {
    return new L.circle(latlng,
      {radius: markerSize(feature.properties.mag),
      fillColor: markerColor(feature.properties.mag),
      fillOpacity: 0.8,
      stroke: true,
      weight: 0.5,
      color: "#00004d"
    })
  }
  });

  var faultlines = L.geoJSON(faultlinesData,{
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h4> Name: "+ feature.properties.Name+"</h4>");
  }
});
  // Sending our earthquakes and faultline layer to the createMap function
  createMap(earthquakes, faultlines);
}

function createMap(earthquakes, faultlines) {

  // Define streetmap and darkmap layers
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,    
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite Map": satellitemap,
    "Street Map": streetmap,
    "Grayscale": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    Faultlines: faultlines
  };

  // Create our map, giving it the satelitemap & earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [40.57,-100.58],
    zoom: 4,
    layers: [satellitemap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() { 
      var div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [0, 1, 2, 3, 4, 5];
  
      for (var i = 0; i < magnitudes.length; i++) {
          div.innerHTML +=
              '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> '
      + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
}
// Create defined markers based of the magnitude
function markerSize(magnitude) {
  return magnitude * 20000;
}

function markerColor(magnitude) {
  if (magnitude <= 1) {
      return "#ADFF2F";
  } else if (magnitude <= 2) {
      return "#9ACD32";
  } else if (magnitude <= 3) {
      return "#FFFF00";
  } else if (magnitude <= 4) {
      return "#ffd700";
  } else if (magnitude <= 5) {
      return "#FFA500";
  } else {
      return "#FF0000";
  };
}