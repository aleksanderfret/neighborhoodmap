import React from 'react';

const DetailsAddress = (props) => {
  return (
    <React.Fragment>
      <h4>Address</h4>
      <p className='props-addres'>
        {props.address.name !== props.address.street &&
          <React.Fragment>
            {props.address.name}<br />
          </React.Fragment>
        }
        {props.address.street}<br />
        {props.address.city}<br />
        {props.address.country}
      </p>
    </React.Fragment>
  );
}

export default DetailsAddress;