import React from 'react';

const InfoBoxHeader = (props) => {
  return (
    <React.Fragment>
      <header>
        <h3
          className='park-name'
          tabIndex={0}
          aria-labelledby='descriptionClose'
        >
          {props.name}
        </h3>
      </header>
    </React.Fragment>
  );
}

export default InfoBoxHeader;