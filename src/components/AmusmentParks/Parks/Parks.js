import React from 'react';
import Park from './Park/Park';

const Parks = (props) => {
  return (
    <ul className='ParkList'>
      {props.parks.map((park, index) => (
        <Park
          key={index}
          id={index}
          name={park.name} />
      ))}
    </ul>
  );
}

export default Parks;