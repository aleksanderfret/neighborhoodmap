import React, { Component } from 'react';
import Panel from './Panel/Panel';
import ParkMap from './ParkMap/ParkMap';

class AmusmentParks extends Component {
  state = {
    parks: [
      {title: 'Legoland Windsor', position: {lat: 51.4638338, lng: -0.6500275}},
      {title: 'Legoland', position: {lat: 55.73551089999999, lng: 9.1268046}},
      {title: 'Legoland Deutschland', position: {lat: 48.4246949, lng: 10.2997017}},
      {title: 'Legoland Malaysia', position: {lat: 1.4273918, lng: 103.630269}},
      {title: 'Disneyland Park', position: {lat: 33.8120918, lng: -117.9189742}},
      {title: 'Tokyo Disneyland', position: {lat: 35.6328964, lng: 139.8803943}},
      {title: 'Magic Kingdom', position: {lat: 28.417663, lng: -81.58121199999999}},
      {title: 'Disneyland Park Paris', position: {lat: 48.8722344, lng: 2.7758079}},
      {title: 'Universal Studios Florida', position: {lat: 28.472596, lng: -81.46656399999999}},
      {title: 'Universal Studios Japan', position: {lat: 34.665442, lng: 135.4323382}},
      {title: 'Universal Studios Hollywood', position: {lat: 34.13811680000001, lng: -118.3533783}},
      {title: 'Universals Islands of Adventure', position: {lat: 28.4711402, lng: -81.47156509999999}},
      {title: 'Beto Carrero World', position: {lat: -26.8016998, lng: -48.6175719}},
      {title: 'Europa Park', position: {lat: 48.2660194, lng: 7.7220076}},
      {title: 'Port Aventura', position: {lat: 41.08782859999999, lng: 1.1572475}},
      {title: 'Tivoli Gardens', position: {lat: 55.6736841, lng: 12.5681471}},
    ],
    markers: []
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Panel
          parks = {this.state.parks}/>
        <div id="map" className='map'>
          <ParkMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,places&key=AIzaSyDRYJI7iuE8nySIexxrjMfquYL-pPyLHW8"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            parks = {this.state.parks}/>
        </div>
      </React.Fragment>
    );
  }
}

export default AmusmentParks;