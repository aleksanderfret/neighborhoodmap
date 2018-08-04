import React from 'react';
import DetailsImage from './DetailsFragments/DetailsImage';
import DetailsAddress from './DetailsFragments/DetailsAddress';
import DetailsContact from './DetailsFragments/DetailsContact';
import DetailsHours from './DetailsFragments/DetailsHours';
import DetailsDescription from './DetailsFragments/DetailsDescription';
import DetailsSource from './DetailsFragments/DetailsSource';

const ParkInfoBoxDetails = (props) => {
  return (
    <div
      id='park-details'
      className='park-details'
    >
      {props.park.bestPhotoUrl &&
        <DetailsImage
          url={props.park.bestPhotoUrl}
          alt={`${props.name} theme park`}
        />
      }
      {props.park.address &&
        <DetailsAddress
          address={props.park.address}
        />
      }
      {props.park.contact &&
        <DetailsContact
          name={props.name}
          contact={props.park.contact}
        />
      }
      {props.park.hours &&
        <DetailsHours
          hours={props.park.hours}
        />
      }
      {props.park.description &&
        <DetailsDescription
          description={props.park.description}
        />
      }
      {props.park.source &&
        <DetailsSource
          source={props.park.source}
        />
      }
      <p id="descriptionClose">
        {`Information about ${props.name} amusement park. Close this infobox by pressing escape button.`}
      </p>
    </div>
  );
}

export default ParkInfoBoxDetails;

