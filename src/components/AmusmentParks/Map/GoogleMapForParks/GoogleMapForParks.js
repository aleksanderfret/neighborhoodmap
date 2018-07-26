import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class CustomGoogleMap extends Component {
  // TODO should it be in state
  isMapReady = false;

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
          this.props.markers.map((marker) => {
            return (
              <Marker
                key={marker.title}
                title={marker.title}
                position={marker.position}
              ></Marker>
            );
          }
          )
        }
      </GoogleMap>)
  }
}

const GoogleMapForParks = withScriptjs(withGoogleMap(CustomGoogleMap));

export default GoogleMapForParks;