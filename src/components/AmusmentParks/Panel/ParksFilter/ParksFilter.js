import React, { Component } from 'react';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import debounce from 'lodash.debounce';

class ParksFilter extends Component {
  state = {
    query: ''
  }
  parks = [
    {title: 'Legoland Windsor', position: {lat: 51.4638338, lng: -0.6500275}},
    {title: 'Legoland', position: {lat: 55.73551089999999, lng: 9.1268046}},
    {title: 'Legoland Deutschland', position: {lat: 48.4246949, lng: 10.2997017}},
    {title: 'Legoland Malaysia', position: {lat: 1.4273918, lng: 103.630269}},
    {title: 'Disneyland Park', position: {lat: 33.8120918, lng: -117.9189742}},
    {title: 'Tokyo Disneyland', position: {lat: 35.6328964, lng: 139.8803943}},
    {title: 'Magic Kingdom', position: {lat: 28.417663, lng: -81.58121199999999}},
    {title: 'Disneyland Park Paris', position: {lat: 48.8722344, lng: 2.7758079}},
    {title: 'Universal Studios Florida', position: {lat: 28.472596, lng: -81.46656399999999}},
    {title: 'Universal Studios Japan', position: {lat: 34.665442, lng: 135.4323382}},
    {title: 'Universal Studios Hollywood', position: {lat: 34.13811680000001, lng: -118.3533783}},
    {title: 'Universals Islands of Adventure', position: {lat: 28.4711402, lng: -81.47156509999999}},
    {title: 'Beto Carrero World', position: {lat: -26.799434, lng: -48.613503}},
    {title: 'Europa Park', position: {lat: 48.2660194, lng: 7.7220076}},
    {title: 'Port Aventura', position: {lat: 41.08782859999999, lng: 1.1572475}},
    {title: 'Tivoli Gardens', position: {lat: 55.6736841, lng: 12.5681471}},
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
    console.log(visibleParks);
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