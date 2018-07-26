import React, { Component } from 'react';
import ParksGoogleMap from './ParksGoogleMap/ParksGoogleMap';

class Map extends Component {

  mapMounted = ((ref) => {
    this.map = ref;
  })

  adjustMapToParks = () => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.parks.forEach((park) => {
      bounds.extend(park.position);
    });
    this.map.fitBounds(bounds);
  }

  render() {
    return (
      <div id="map" className='map'>
        <ParksGoogleMap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,places&key=AIzaSyDRYJI7iuE8nySIexxrjMfquYL-pPyLHW8"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={this.props.parks}
          zoom={12}
          center={{ lat: 0.0, lng: 10.0 }}
          mapMounted={this.mapMounted}
          onMapReady={this.adjustMapToParks}
          gestureHandling='greedy'
          markerColor='0891d1'
        />
      </div>
    );
  }
}

export default Map;