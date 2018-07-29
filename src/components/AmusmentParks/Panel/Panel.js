import React from 'react';
import ParksList from './ParksList/ParksList';
import ParksFilter from './ParksFilter/ParksFilter';

const Panel = (props) => {
  return (
    <div className='panel'>
      <ParksFilter/>
      <ParksList/>
    </div>
  );
}

export default Panel;