import React, { Component } from 'react';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import debounce from 'lodash.debounce';
import parksData from '../../../../parkData/parkData';

class ParksFilter extends Component {
  state = {
    query: ''
  };

  parks = parksData;

  componentDidMount = () => {
    this.props.setVisibleParks(this.parks);
  };

  filterParks = (query) => {
    let visibleParks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      visibleParks = this.parks.filter(park => match.test(park.title));
    } else {
      visibleParks = this.parks;
    }
    this.props.setVisibleParks(visibleParks);

    if (this.props.activePark) {
      const activeParkFounded = visibleParks.find((park) => {
        return park.id === this.props.activePark.id;
      });
      if (!activeParkFounded) {
        this.props.setActivePark(null);
      }
    }
  };

  filterParksDebounced = debounce(this.filterParks, 500);


  filterParksInputHandler = (event) => {
    const newQuery = event.target.value;
    this.setState(() => ({ query: newQuery }));
    this.filterParksDebounced(newQuery);
  };

  resetFilter = () => {
    this.setState(() => {
      this.filterParks('');
      return { query: '' };
    });
  };

  componentWillUnmount = () => {
    this.filterParksDebounced.cancel();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.isPanelVisibleOnMobile && !prevProps.isPanelVisibleOnMobile) {
      this.filterInput.focus();
    }
  };

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
          ref={(ref) => { this.filterInput = ref }}
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
};

const mapStateToProps = (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => { dispatch({ type: 'SET_ACTIVE_PARK', activePark: activePark }) },
  setVisibleParks: (visibleParks) => { dispatch({ type: 'SET_VISIBLE_PARKS', visibleParks }) },
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksFilter);