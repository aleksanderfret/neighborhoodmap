import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ParkInfoWindow from './ParkInfoWindow/ParkInfoWindow';

class CustomGoogleMap extends Component {

  state = {
    isOpen: false,
    activeMarker: null,
  }
  // TODO should it be in state
  isMapReady = false;

  markerImage = {
    url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0891d1|40|_|%E2%80%A2`,
    size: new window.google.maps.Size(21, 34),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 34),
    scaledSize: new window.google.maps.Size(21,34)
  }

  setActiveMarker = (marker) => {
    this.setState(() => {
      let newState = {
        activeMarker: marker,
      };
      if (marker) {
       this.adjustMapToActiveMarker(marker);
      }
      return newState;
    });
  }

  mapMounted = ((ref) => {
    this.map = ref;
  })

  adjustMapToActiveMarker = (marker) => {
    const bounds = {
      south: marker.position.lat-0.001,
      west: marker.position.lng-0.001,
      north: marker.position.lat+0.001,
      east: marker.position.lng+0.001
    }
    this.map.fitBounds(bounds);
  }

  adjustMapToMarkers = () => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.markers.forEach((marker) => {
      bounds.extend(marker.position);
    });
    this.map.fitBounds(bounds);
  }

  onTilesLoaded = () => {
    if (this.isMapReady) return;
    this.adjustMapToMarkers();
    this.isMapReady = true;
  }

  render() {
    return (
      <GoogleMap
        ref={this.mapMounted}
        defaultZoom={12}
        defaultCenter={{lat: 0, lng: 10}}
        onTilesLoaded={this.onTilesLoaded}
        defaultOptions={{
          gestureHandling: 'greedy',
          mapTypeControl: false
        }}
      >
        { this.props.markers.length > 0 &&
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
                animation={this.state.activeMarker === marker ? window.google.maps.Animation.BOUNCE : null}
                onClick={() => {this.setActiveMarker(marker)}}
              >
                {this.state.activeMarker === marker && <ParkInfoWindow
                  onCloseClick={() => {this.setActiveMarker(null)}}
                  title={marker.title}
                />
                }
              </Marker>
            )}
          </MarkerClusterer>
        }
      </GoogleMap>
    )
  }
}

const ParkMap = withScriptjs(withGoogleMap(CustomGoogleMap));

export default ParkMap;