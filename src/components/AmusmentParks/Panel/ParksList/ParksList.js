import React from 'react';
import Park from './Park/Park';

const ParksList = (props) => {
  return (
    <ul className='parks-list'>
      {props.parks.map((park, index) => (
        <Park
          key={index}
          id={index}
          name={park.title} />
      ))}
    </ul>
  );
}

export default ParksList;