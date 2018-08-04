import React from 'react';

const ParkItem = (props) => {
  return (
    <button
      onClick={() => {
        props.setActivePark(props.park);
        if (props.isPanelVisible) {
          props.toggleSidePanel();
        }
      }}
      className={'park-button ' + (props.park === props.activePark ? 'active' : '')}
      role='menuitem'
    >{props.park.title}
    </button>
  );
}

export default ParkItem;