import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ParkInfoWindow from './ParkInfoWindow/ParkInfoWindow';
import { connect } from 'react-redux';

class CustomGoogleMap extends Component {

  // TODO should it be in state
  isMapReady = false;

  markerImage = {
    url: `http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0891d1|40|_|%E2%80%A2`,
    size: new window.google.maps.Size(21, 34),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(10, 34),
    scaledSize: new window.google.maps.Size(21,34)
  };

  mapMounted = ((ref) => {
    this.map = ref;
  });

  adjustMapToActiveMarker = () => {
    const marker = this.props.activeMarker;
    const bounds = {
      south: marker.position.lat-0.001,
      west: marker.position.lng-0.001,
      north: marker.position.lat+0.001,
      east: marker.position.lng+0.001
    }
    this.map.fitBounds(bounds);
  };

  adjustMapToMarkers = () => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.markers.forEach((marker) => {
      bounds.extend(marker.position);
    });
    this.map.fitBounds(bounds);
  };

  onTilesLoaded = () => {
    if (this.isMapReady) return;
    this.adjustMapToMarkers();
    this.isMapReady = true;
  };

  componentDidUpdate(prevProps) {
    if (this.props.activeMarker && this.props.activeMarker !== prevProps.activeMarker) {
      this.adjustMapToActiveMarker();
    }
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
                animation={this.props.activeMarker === marker ? window.google.maps.Animation.BOUNCE : null}
                onClick={() => {this.props.setActiveMarker(marker)}}
              >
                {this.props.activeMarker === marker && <ParkInfoWindow
                  onCloseClick={() => {this.props.setActiveMarker(null)}}
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

const mapStateToProps =  (state) => ({
  activeMarker: state.activePark,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMarker: (activeMarker) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activeMarker})},
});

const ParkMap = withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(CustomGoogleMap)));

export default ParkMap;