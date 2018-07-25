import React from 'react';
import AmusmentParksList from './AmusmentParksList/AmusmentParksList';
import FilterInput from './FilterInput/FilterInput';

const AmusmentParkPanel = (props) => {
  return (
    <div className='parks-panel'>
      <FilterInput/>
      <AmusmentParksList
        parks={props.parks}
      />
    </div>
  );
}

export default AmusmentParkPanel;