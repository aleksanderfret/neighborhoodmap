import React, { Component } from 'react';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import debounce from 'lodash.debounce';

class ParksFilter extends Component {
  state = {
    query: ''
  }
  parks = [
    {id: 1, title: 'Legoland Windsor', query: 'legoland', position: {lat: 51.4638338, lng: -0.6500275}},
    {id: 2, title: 'Legoland', query: 'legoland', position: {lat: 55.73551089999999, lng: 9.1268046}},
    {id: 3, title: 'Legoland Deutschland', query: 'legoland', position: {lat: 48.4246949, lng: 10.2997017}},
    {id: 4, title: 'Park Asterix', query: 'park asterix', position: {lat: 49.1341839, lng: 2.5712301}},
    {id: 5, title: 'Efteling', query: 'Efteling', position: {lat: 51.6506518, lng: 5.0497462}},
    {id: 6, title: 'Energylandia', query: 'Energylandia', position: {lat: 49.9994648, lng: 19.4112672}},
    {id: 7, title: 'Disneyland Park Paris', query: 'Disneyland Paris', position: {lat: 48.8722344, lng: 2.7758079}},
    {id: 8, title: 'Europa Park', query: 'Europa Park', position: {lat: 48.2660194, lng: 7.7220076}},
    {id: 9, title: 'Port Aventura', query: 'Costa Caribe Aquatic Park - Port Aventura', position: {lat: 41.08782859999999, lng: 1.1572475}},
    {id: 10, title: 'Tivoli Gardens', query: 'Tivoli Gardens', position: {lat: 55.6736841, lng: 12.5681471}},
    {id: 11, title: 'Liseberg', query: 'Liseberg', position: {lat: 57.6952191, lng: 11.9924641}},
    {id: 12, title: 'Gardaland', query: 'Gardaland', position: {lat: 45.4550142, lng: 10.7137527}},
  ]

  componentDidMount = () => {
    this.props.setVisibleParks(this.parks);
  }

  filterParks = (query) => {
    let visibleParks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      visibleParks = this.parks.filter(park => match.test(park.title));
    } else {
      visibleParks = this.parks;
    }
    this.props.setVisibleParks(visibleParks);

    if (this.props.activePark){
      const activeParkFounded = visibleParks.find((park) => {
        return park.id === this.props.activePark.id;
      });
      if (!activeParkFounded) {
        this.props.setActivePark(null);
      }
    }
  }

  filterParksDebounced = debounce(this.filterParks, 500);


  filterParksInputHandler = (event) => {
    const newQuery = event.target.value;
    this.setState(() => ({ query: newQuery }));
    this.filterParksDebounced(newQuery);
  }

  resetFilter = () => {
    this.setState(() => {
      this.filterParks('');
      return {query: ''};
    });
  }

  componentWillUnmount = () => {
    this.filterParksDebounced.cancel()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.isPanelVisibleOnMobile && !prevProps.isPanelVisibleOnMobile) {
      this.filterInput.focus();
    }
  }

  render() {
    return (
      <div className='filter-parks'>
        <input
          tabIndex={-1}
          id='filter-input'
          className='filter-input'
          placeholder='Filter parks'
          type='text'
          name='filter'
          aria-label='filter the amusement parks'
          value={this.state.query}
          onChange={this.filterParksInputHandler}
          ref={(ref) => {this.filterInput = ref}}
        />
        <button
          className='filter-reset'
          onClick={this.resetFilter}
          title='reset filter'
          aria-label='reset filter'
        ><i className='fas fa-times'></i>
        </button>
      </div>
    );
  }
}

const mapStateToProps =  (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activePark})},
  setVisibleParks: (visibleParks) => {dispatch({type: 'SET_VISIBLE_PARKS', visibleParks})},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksFilter);