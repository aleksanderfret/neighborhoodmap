import React, { Component } from 'react';
import Panel from './Panel/Panel';
import ParkMap from './ParkMap/ParkMap';

class AmusmentParks extends Component {

  render() {
    return (
      <React.Fragment>
        <Panel/>
        <div id="map" className='map'>
          <ParkMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,drawing,places&key=AIzaSyDRYJI7iuE8nySIexxrjMfquYL-pPyLHW8"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AmusmentParks;