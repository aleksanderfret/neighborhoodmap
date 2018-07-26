import React, { Component } from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class CustomGoogleMap extends Component {
  // TODO should it be in state
  isMapReady = false;

  markerImage = {
    url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|${this.props.markerColor}|40|_|%E2%80%A2`,
    size: new window.google.maps.Size(21, 34),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 34),
    scaledSize: new window.google.maps.Size(21,34)
  }

  onTilesLoaded = () => {
    if (this.isMapReady) return;
    this.props.onMapReady();
    this.isMapReady = true;
  }

  render() {
    return (
      <GoogleMap
        ref={this.props.mapMounted}
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onTilesLoaded={this.onTilesLoaded}
        defaultOptions={{
          gestureHandling: this.props.gestureHandling,
          mapTypeControl: false
        }}
      >
        {this.props.isMarkerShown && this.props.markers.length > 0 &&
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={40}
          >
            {this.props.markers.map(marker =>
              <Marker
                key={marker.title}
                title={marker.title}
                position={marker.position}
                icon={this.markerImage}
              ></Marker>
            )}
          </MarkerClusterer>
        }
      </GoogleMap>)
  }
}

const ParksGoogleMap = withScriptjs(withGoogleMap(CustomGoogleMap));

export default ParksGoogleMap;