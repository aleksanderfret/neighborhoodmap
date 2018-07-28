import React from 'react';
import { StreetViewPanorama, OverlayView } from 'react-google-maps';

const ParkStreetView = (props) => (
  <StreetViewPanorama
    defaultPosition={props.position}
    visible
  >
  </StreetViewPanorama>
)

export default ParkStreetView;