import React from 'react';

const ParkItem = (props) => {
  return (
    <button
      onClick={() => {props.setActivePark(props.park)}}
    >{props.park.title}
    </button>
  );
}

export default ParkItem;