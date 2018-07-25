import React from 'react';

const AmusmentPark = (props) => {
  return (
    <li
      className='amusement-park'
      key={props.id}>
      <button
        data-park = {props.id}
      >{props.name}
      </button>
    </li>
  );
}

export default AmusmentPark;