import React, { Component } from 'react';
import Panel from './Panel/Panel';
import ParkMap from './ParkMap/ParkMap';

class AmusmentParks extends Component {

  render() {
    return (
      <React.Fragment>
        <Panel/>
        <div
          id="map"
          className='map'
          role="application"
          aria-label="map with amusement pars locations"
        >
          <ParkMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,drawing,places&key=AIzaSyDRYJI7iuE8nySIexxrjMfquYL-pPyLHW8"
            loadingElement={<div className={'loadingElement'} />}
            containerElement={<div className={'containerElement'} />}
            mapElement={<div className={'mapElement'} />}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AmusmentParks;