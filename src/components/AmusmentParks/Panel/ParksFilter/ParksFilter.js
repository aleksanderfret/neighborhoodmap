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
    // {id: 17, title: 'Legoland Malaysia', query: 'legoland theme park', position: {lat: 1.4273918, lng: 103.630269}},
    // {id: 18, title: 'Disneyland Park', query: 'Disneyland Park', position: {lat: 33.8120918, lng: -117.9189742}},
    // {id: 19, title: 'Tokyo Disneyland', query: 'Tokyo Disneyland', position: {lat: 35.6328964, lng: 139.8803943}},
    // {id: 20, title: 'Disney Magic Kingdom', query: 'Magic Kingdom', position: {lat: 28.417663, lng: -81.58121199999999}},
    // {id: 21, title: 'Universal Studios Florida', query: 'Universal Studios Florida', position: {lat: 28.472596, lng: -81.46656399999999}},
    // {id: 22, title: 'Universal Studios Japan', query: 'Universal Studios Japan', position: {lat: 34.665442, lng: 135.4323382}},
    // {id: 23, title: 'Universal Studios Hollywood', query: 'Universal Studios Hollywood', position: {lat: 34.13811680000001, lng: -118.3533783}},
    // {id: 24, title: 'Universals Islands of Adventure', query: 'Universals Islands of Adventure', position: {lat: 28.4711402, lng: -81.47156509999999}},
    // {id: 25, title: 'Beto Carrero World', query: 'Beto Carrero World', position: {lat: -26.799434, lng: -48.613503}},
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

  render() {
    return (
      <div className='filter-parks'>
        <input
          className='filter-input'
          placeholder='Filter parks'
          type='text'
          name='filter'
          value={this.state.query}
          onChange={this.filterParksInputHandler}
        />
        <button
          onClick={this.resetFilter}
          title='reset filter'
        ><i className='fas fa-times'></i>
        </button>
      </div>
    );
  }
}

const mapStateToProps =  (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activePark})},
  setVisibleParks: (visibleParks) => {dispatch({type: 'SET_VISIBLE_PARKS', visibleParks})},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksFilter);