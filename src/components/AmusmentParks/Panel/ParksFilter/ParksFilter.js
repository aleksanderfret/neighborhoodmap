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
    {id: 4, title: 'Legoland Malaysia', query: 'legoland theme park', position: {lat: 1.4273918, lng: 103.630269}},
    {id: 5, title: 'Disneyland Park', query: 'Disneyland Park', position: {lat: 33.8120918, lng: -117.9189742}},
    {id: 6, title: 'Tokyo Disneyland', query: 'Tokyo Disneyland', position: {lat: 35.6328964, lng: 139.8803943}},
    {id: 7, title: 'Disney Magic Kingdom', query: 'Magic Kingdom', position: {lat: 28.417663, lng: -81.58121199999999}},
    {id: 8, title: 'Disneyland Park Paris', query: 'Disneyland Paris', position: {lat: 48.8722344, lng: 2.7758079}},
    {id: 9, title: 'Universal Studios Florida', query: 'Universal Studios Florida', position: {lat: 28.472596, lng: -81.46656399999999}},
    {id: 10, title: 'Universal Studios Japan', query: 'Universal Studios Japan', position: {lat: 34.665442, lng: 135.4323382}},
    {id: 11, title: 'Universal Studios Hollywood', query: 'Universal Studios Hollywood', position: {lat: 34.13811680000001, lng: -118.3533783}},
    {id: 12, title: 'Universals Islands of Adventure', query: 'Universals Islands of Adventure', position: {lat: 28.4711402, lng: -81.47156509999999}},
    {id: 13, title: 'Beto Carrero World', query: 'Beto Carrero World', position: {lat: -26.799434, lng: -48.613503}},
    {id: 14, title: 'Europa Park', query: 'Europa Park', position: {lat: 48.2660194, lng: 7.7220076}},
    {id: 15, title: 'Port Aventura', query: 'Costa Caribe Aquatic Park - Port Aventura', position: {lat: 41.08782859999999, lng: 1.1572475}},
    {id: 16, title: 'Tivoli Gardens', query: 'Tivoli Gardens', position: {lat: 55.6736841, lng: 12.5681471}},
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
      <React.Fragment>
        <input
          className='filter-parks'
          placeholder='Filter parks'
          type='text'
          name='filter'
          value={this.state.query}
          onChange={this.filterParksInputHandler}
        />
        <button
          onClick={this.resetFilter}
          title='reset filter'
        >X
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps =  (state) => ({
  visibleParks: state.visibleParks,
});

const mapDispatchToProps = (dispatch) => ({
  setVisibleParks: (visibleParks) => {dispatch({type: 'SET_VISIBLE_PARKS', visibleParks})},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksFilter);