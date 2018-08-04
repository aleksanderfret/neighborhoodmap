import React from 'react';

const DetailsDescription = (props) => {
  return (
    <React.Fragment>
      <h4>Description</h4>
      <p className='park-description'>{props.description}</p>
    </React.Fragment>
  );
}

export default DetailsDescription;