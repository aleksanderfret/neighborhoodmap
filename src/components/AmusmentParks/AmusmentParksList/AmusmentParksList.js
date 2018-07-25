import React from 'react';
import AmusmentPark from './AmusmentPark/AmusmentPark';

const AmusmentParksList = (props) => {
  return (
    <ul className='AmusmentParksList'>
      {props.parks.map((park, index) => (
        <AmusmentPark
          key={index}
          id={index}
          name={park.title} />
      ))}
    </ul>
  );
}

export default AmusmentParksList;