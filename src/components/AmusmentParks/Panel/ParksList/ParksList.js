import React from 'react';
import Park from './Park/Park';
import { connect } from 'react-redux';

const ParksList = (props) => {
  return (
    <ul className='parks-list'>
      {props.visibleParks.map((park, index) => (
        <Park
          key={index}
          id={index}
          name={park.title} />
      ))}
    </ul>
  );
}

const mapStateToProps =  (state) => ({
  visibleParks: state.visibleParks,
});

export default connect(mapStateToProps)(ParksList);
