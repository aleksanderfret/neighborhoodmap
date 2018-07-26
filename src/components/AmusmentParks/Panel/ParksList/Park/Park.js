import React from 'react';

const Park = (props) => {
  return (
    <li
      className='park'
      key={props.id}>
      <button
        data-park = {props.id}
      >{props.name}
      </button>
    </li>
  );
}

export default Park;