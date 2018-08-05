import React from 'react';

const DetailsSource = (props) => {
  return (
    <React.Fragment>
      <h4>Data source</h4>
      <a
        className='source-link'
        href={props.source}
        target="_blank"
        aria-label='data source from Foursquare'
      >
        Foursquare
      </a>
    </React.Fragment>
  );
}

export default DetailsSource;