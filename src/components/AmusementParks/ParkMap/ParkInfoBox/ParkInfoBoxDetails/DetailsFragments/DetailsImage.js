import React from 'react';

const DetailsImage = (props) => {
  return (
    <React.Fragment>
      <img
        className='park-image'
        src={props.url}
        alt={props.alt}
      />
    </React.Fragment>
  );
}

export default DetailsImage;