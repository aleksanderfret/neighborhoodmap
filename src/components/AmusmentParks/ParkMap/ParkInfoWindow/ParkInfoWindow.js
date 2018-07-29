import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';
import ParkStreetView from './ParkStreetView/ParkStreetView';
import * as ParksAPI from '../../../../dataAPI/dataAPI';

class ParkInfoWindow extends Component {
  parkData = {};

  componentDidMount = () => {
  //   ParksAPI.getParkData(this.props.park)
  //     .then((park) => {
  //       console.log(park);
  //       this.parkData = park;
  //     });
   }


  render () {
    return(
      <InfoWindow
        onCloseClick={this.props.onCloseClick}
      >
        <div className='info-window'>
          <h2>{this.props.park.title}</h2>
          {/* <div id='streetview'>
            <ParkStreetView
              position={this.props.park.position}
            />
          </div> */}
        </div>
    </InfoWindow>
    );
  }
}

export default ParkInfoWindow;