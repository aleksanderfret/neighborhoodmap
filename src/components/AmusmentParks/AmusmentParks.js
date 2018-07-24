import React, { Component } from 'react';
import Parks from './Parks/Parks';
import Map from './Map/Map';

class AmusmentParks extends Component {
  state = {
    parks: [
      {name: 'Legoland Windsor', location: {lat: 51.4638338, lng: -0.6500275}},
      {name: 'Legoland', location: {lat: 55.73551089999999, lng: 9.1268046}},
      {name: 'Legoland Deutschland', location: {lat: 48.4246949, lng: 10.2997017}},
      {name: 'Legoland Malaysia', location: {lat: 1.4273918, lng: 103.630269}},
      {name: 'Disneyland Park', location: {lat: 33.8120918, lng: -117.9189742}},
      {name: 'Tokyo Disneyland', location: {lat: 35.6328964, lng: 139.8803943}},
      {name: 'Magic Kingdom', location: {lat: 28.417663, lng: -81.58121199999999}},
      {name: 'Disneyland Park Paris', location: {lat: 48.8722344, lng: 2.7758079}},
      {name: 'Universal Studios Florida', location: {lat: 28.472596, lng: -81.46656399999999}},
      {name: 'Universal Studios Japan', location: {lat: 34.665442, lng: 135.4323382}},
      {name: 'Universal Studios Hollywood', location: {lat: 34.13811680000001, lng: -118.3533783}},
      {name: 'Universals Islands of Adventure', location: {lat: 28.4711402, lng: -81.47156509999999}},
      {name: 'Beto Carrero World', location: {lat: -26.8016998, lng: -48.6175719}},
      {name: 'Europa Park', location: {lat: 48.2660194, lng: 7.7220076}},
      {name: 'Port Aventura', location: {lat: 41.08782859999999, lng: 1.1572475}},
      {name: 'Tivoli Gardens', location: {lat: 55.6736841, lng: 12.5681471}},
    ],
    markers: []
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <React.Fragment>
        <Parks
          parks = {this.state.parks}/>
        <Map/>
      </React.Fragment>
    );
  }
}

export default AmusmentParks;