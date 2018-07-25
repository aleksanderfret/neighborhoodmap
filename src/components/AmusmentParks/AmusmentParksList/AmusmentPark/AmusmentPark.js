import React from 'react';

const AmusmentPark = (props) => {
  return (
    <li
      className='AmusmentPark'
      key={props.id}>
      <button
        data-park = {props.id}
      >{props.name}
      </button>
    </li>
  );
}

export default AmusmentPark;