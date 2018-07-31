import React from 'react';
import { connect } from 'react-redux';
import ParksList from './ParksList/ParksList';
import ParksFilter from './ParksFilter/ParksFilter';

const Panel = (props) => {
  return (
    <div
      className={'panel ' + (props.isPanelVisibleOnMobile ? 'open' : '')}
    >
      <ParksFilter/>
      <ParksList/>
    </div>
  );
}

const mapStateToProps =  (state) => ({
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

export default connect(mapStateToProps)(Panel);