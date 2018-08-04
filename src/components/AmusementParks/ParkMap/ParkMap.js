import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ParkInfoBox from './ParkInfoBox/ParkInfoBox';
import ParkMapControls from './ParkMapControls/ParkMapControls';

class CustomGoogleMap extends Component {
  state={
    infoBoxAlignBottom: true,
    offset: -60,
  };

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

  adjustMapToPark = (parkToCenter) => {
    const distance = 0.001;
    const distanceNorth = (this.props.activePark) ? 0.01 : distance;
    this.setInfoBoxAlignemt(true);
    const bounds = {
      south: parkToCenter.position.lat-distance,
      west: parkToCenter.position.lng-distance,
      north: parkToCenter.position.lat+distanceNorth,
      east: parkToCenter.position.lng+distance
    }
    this.map.fitBounds(bounds);
  };

  adjustMapToParks = () => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.visibleParks.forEach((park) => {
      bounds.extend(park.position);
    });
    this.map.fitBounds(bounds);

    const activePark = this.props.activePark;
    if (activePark) {
      const infoBoxAlignBottom = (activePark.position.lat > this.mapCenter.lat) ? false : true;
      this.setInfoBoxAlignemt(infoBoxAlignBottom);
    }
  };

  setInfoBoxAlignemt = (infoBoxAlignBottom) => {
    this.setState({
      infoBoxAlignBottom,
      offset: (infoBoxAlignBottom) ? -60 : -10,
    });
  };

  onTilesLoaded = () => {
    if (this.isMapReady) return;
    this.adjustMapToParks();
    this.isMapReady = true;
    this.mapCenter = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng(),
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.activePark && this.props.activePark !== prevProps.activePark) {
      this.adjustMapToPark(this.props.activePark);
    }
  }

  render() {
    return (
      <React.Fragment>
        <GoogleMap
          ref={this.mapMounted}
          defaultZoom={12}
          defaultCenter={{lat: 0, lng: 10}}
          onTilesLoaded={this.onTilesLoaded}
          defaultOptions={{
            gestureHandling: 'greedy',
            mapTypeControl: false,
          }}
        >
          { this.props.visibleParks.length > 0 &&
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={40}
            >
              {this.props.visibleParks.map((park, index) =>
                <Marker
                  tabindex={index}
                  key={park.title}
                  title={park.title}
                  position={park.position}
                  icon={this.markerImage}
                  animation={this.props.activePark === park ? window.google.maps.Animation.BOUNCE : null}
                  onClick={() => {this.props.setActivePark(park)}}
                >
                  {this.props.activePark === park &&
                  <ParkInfoBox
                    alignBottom={this.state.infoBoxAlignBottom}
                    setAlignmentOnClose={() => {this.setInfoBoxAlignemt(true)}}
                    adjustMapToPark={() => {this.adjustMapToPark(park)}}
                    onCloseClick={() => {this.props.setActivePark(null)}}
                    title={park.title}
                    park={park}
                    offset={this.state.offset}
                  />
                  }
                </Marker>
              )}
            </MarkerClusterer>
          }
        <ParkMapControls
          position={window.google.maps.ControlPosition.TOP_LEFT}
        >
          <div className='map-controls'>
            <button
              type='button'
              onClick={()=>{this.adjustMapToParks(this.props.visibleParks)}}
              disabled={!this.props.visibleParks.length}
            >
              <img src='assets/icons/zoom-to-all-parks.svg' alt='Zoom to all parks' title='Zoom to all parks'/>
            </button>
            <button
              type='button'
              onClick={()=>{this.adjustMapToPark(this.props.activePark)}}
              disabled={!this.props.activePark}
            >
              <img src='assets/icons/zoom-to-active-park.svg' alt='Zoom to active park' title='Zoom to active park'/>
            </button>
          </div>
        </ParkMapControls>
        </GoogleMap>
      </React.Fragment>
    )
  }
}

const mapStateToProps =  (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activePark})},
});

const ParkMap = withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(CustomGoogleMap)));

export default ParkMap;