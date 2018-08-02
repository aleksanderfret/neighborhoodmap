import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ParkInfoBox from './ParkInfoBox/ParkInfoBox';
import ParkMapControls from './ParkMapControls/ParkMapControls';

class CustomGoogleMap extends Component {

  // TODO should it be in state
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

  adjustMapToActivePark = () => {
    const park = this.props.activePark;
    const bounds = {
      south: park.position.lat-0.001,
      west: park.position.lng-0.001,
      north: park.position.lat+0.01,
      east: park.position.lng+0.001
    }
    this.map.fitBounds(bounds);
  };

  adjustMapToParks = () => {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.visibleParks.forEach((park) => {
      bounds.extend(park.position);
    });
    this.map.fitBounds(bounds);
  };

  onTilesLoaded = () => {
    if (this.isMapReady) return;
    this.adjustMapToParks();
    this.isMapReady = true;
  };

  componentDidUpdate(prevProps) {
    if (this.props.activePark && this.props.activePark !== prevProps.activePark) {
      this.adjustMapToActivePark();
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
                  // <ParkInfoWindow
                  //   onCloseClick={() => {this.props.setActivePark(null)}}
                  //   title={park.title}
                  //   park={park}
                  // />
                  <ParkInfoBox
                    onCloseClick={() => {this.props.setActivePark(null)}}
                    title={park.title}
                    park={park}
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
              onClick={()=>{this.adjustMapToActivePark(this.props.activePark)}}
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