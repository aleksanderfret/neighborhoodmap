import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';

class ParkInfoWindow extends Component {
  render() {
    return (
      <InfoWindow
        onCloseClick={this.props.onCloseClick}
      >
        <h2>{this.props.title}</h2>
      </InfoWindow>
    );
  }
}

export default ParkInfoWindow;