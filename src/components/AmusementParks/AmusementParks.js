import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from './Panel/Panel';
import ParkMap from './ParkMap/ParkMap';
import scriptLoader from 'react-async-script-loader'

class AmusementParks extends Component {

  state = {
    isGoogleAPIloaded: undefined,
  };

  windowResizeHandler = () => {
    if (window.innerWidth >= 800 && this.props.isPanelVisibleOnMobile) {
      this.toggleSidePanel();
    }
  };

  componentDidMount() {
    this.windowResizeHandler();
    window.addEventListener('resize', this.windowResizeHandler);

    if (this.props.isScriptLoaded) {
      this.setState(() => ({
        isGoogleAPIloaded: this.props.isScriptLoadSucceed,
      }));
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isScriptLoaded && this.props.isScriptLoaded) {
      this.setState(() => ({
        isGoogleAPIloaded: this.props.isScriptLoadSucceed,
      }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.toggleSidePanel();
    }
  };

  onMenuButtonClick = () => {
    this.toggleSidePanel();
  };

  toggleSidePanel = () => {
    this.props.toggleSidePanel();
  };

  render() {
    return (
      <React.Fragment>
        <header className='header'>
          <button
            onClick={this.onMenuButtonClick}
            onKeyPress={this.handleKeyPress}
            className='menu-button'
            aria-haspopup="true"
            aria-controls="panel"
            aria-label='menu'
            aria-expanded={this.props.isPanelVisibleOnMobile}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>Amusement Parks</h1>
        </header>
        <main>
          <Panel />
          <div
            id="map"
            className='map'
            role="application"
            aria-label="map with amusement parks locations"
          >
            {this.state.isGoogleAPIloaded &&
              <ParkMap
                containerElement={<div className={'containerElement'} />}
                mapElement={<div className={'mapElement'} />}
              />
            }
            {this.state.isGoogleAPIloaded === false &&
              <div
                className='map-error'
              >
                <p>Unfortunately loading Google Map failed.</p>
              </div>
            }
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidePanel: () => { dispatch({ type: 'TOGGLE_SIDE_PANEL' }) }
});

const connectedAmusementParks = connect(mapStateToProps, mapDispatchToProps)(AmusementParks);

export default scriptLoader('https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDRYJI7iuE8nySIexxrjMfquYL-pPyLHW8')(connectedAmusementParks);