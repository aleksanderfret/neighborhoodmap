import React, { Component } from 'react';
import GoogleMapForAmusementParks from './GoogleMapForAmusementParks/GoogleMapForAmusementParks';

class AmusmentParksMap extends Component {

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
      <div id="map">
        <GoogleMapForAmusementParks
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
        />
      </div>
    );
  }
}

export default AmusmentParksMap;