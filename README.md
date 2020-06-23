# Leaflet Homework - Visualizing Data with Leaflet
Building a new set of tools to visualize earthquake data from United States Geological Survey

## Background

![1-Logo](Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. They would like to be able to visualize thieir data to better educate the public and other government organizations on issues facing our planet.

### Level 1: Basic Visualization : Visualize an earthquake data set.

![2-BasicMap](Images/2-BasicMap.png)



1. **Get the data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. The data set has been picked up from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page in a JSON format. 

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   A map has been created using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * Popups provide additional information about the earthquake when a marker is clicked.

   * The legend provides a context for the map data.

- - -

### Level 2: More Data

![5-Advanced](Images/5-Advanced.png)

The second data set illustrates the relationship between tectonic plates and seismic activity. This data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.
