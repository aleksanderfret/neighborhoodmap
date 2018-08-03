import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from './Panel/Panel';
import ParkMap from './ParkMap/ParkMap';

class AmusementParks extends Component {
  state={
    expanded: false,
  }

  windowResizeHandler = () => {
    if(window.innerWidth >= 800 && this.props.isPanelVisibleOnMobile) {
      this.props.toggleSidePanel();
      this.setState(() => ({expanded: false}));
    }
  }

  componentDidMount() {
    this.windowResizeHandler();
    window.addEventListener('resize', this.windowResizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.toggleSidePanel();
    }
  }

  onMenuButtonClick = () => {
    this.toggleSidePanel();
  }

  toggleSidePanel = () => {
    this.props.toggleSidePanel();
    this.setState((prevState) => (
      {expanded: !prevState.expanded}
    ));
  }

  render() {
    return(
      <React.Fragment>
        <header className='header'>
          <button
            onClick={this.onMenuButtonClick}
            onKeyPress={this.handleKeyPress}
            className='menu-button'
            aria-haspopup="true"
            aria-controls="panel"
            aria-label='menu'
            aria-expanded={this.state.expanded}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>Amusement Parks</h1>
        </header>
        <main>
          <Panel
            onOpen={this.metoda}
            />
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
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps =  (state) => ({
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidePanel: () => {dispatch({type: 'TOGGLE_SIDE_PANEL'})}
});

export default connect(mapStateToProps, mapDispatchToProps)(AmusementParks);