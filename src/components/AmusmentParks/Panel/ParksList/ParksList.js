import React, { Component } from 'react';
import ParkItem from './ParkItem/ParkItem';
import { connect } from 'react-redux';

const ParksList = (props) => {
  return (
    <ul className='parks-list'>
      {props.visibleParks.map((park, index) => (
        <li
          key={index}
          className={'park ' + (park === props.activePark ? 'park-active' : '')}
        >
          <ParkItem
            park={park}
            setActivePark={props.setActivePark}
          />
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps =  (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activePark})},
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksList);
