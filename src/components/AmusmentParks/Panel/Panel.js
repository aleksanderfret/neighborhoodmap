import React from 'react';
import ParksList from './ParksList/ParksList';
import FilterInput from './FilterInput/FilterInput';

const Panel = (props) => {
  return (
    <div className='panel'>
      <FilterInput/>
      <ParksList
        parks={props.parks}
      />
    </div>
  );
}

export default Panel;