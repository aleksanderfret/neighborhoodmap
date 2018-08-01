import React, { Component } from 'react';
import ParkItem from './ParkItem/ParkItem';
import { connect } from 'react-redux';

const ParksList = (props) => {
  return (
    <ul className='parks-list'>
      {props.visibleParks.map((park, index) => (
        <li
          key={index}
        >
          <ParkItem
            park={park}
            setActivePark={props.setActivePark}
            toggleSidePanel={props.toggleSidePanel}
            activePark={props.activePark}
            isPanelVisible={props.isPanelVisibleOnMobile}
          />
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps =  (state) => ({
  activePark: state.activePark,
  visibleParks: state.visibleParks,
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setActivePark: (activePark) => {dispatch({type: 'SET_ACTIVE_PARK', activePark: activePark})},
  toggleSidePanel: () => {dispatch({type: 'TOGGLE_SIDE_PANEL'})}
});

export default connect(mapStateToProps, mapDispatchToProps)(ParksList);
