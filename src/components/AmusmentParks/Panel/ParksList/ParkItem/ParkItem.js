import React from 'react';

const ParkItem = (props) => {
  return (
    <button
      onClick={() => {
        props.setActivePark(props.park);
        if(props.isPanelVisible){
          props.toggleSidePanel();
        }
      }}
      className='park-button'
    >{props.park.title}
    </button>
  );
}

export default ParkItem;