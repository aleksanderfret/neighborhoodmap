import React from 'react';

const DetailsContact = (props) => {
  return (
    <React.Fragment>
      <h4>Contact</h4>
      <ul className='park-contact'>
        {props.contact.phone &&
          <li className='park-phone'>{`phone: ${props.contact.phone}`}</li>
        }
        {props.contact.website &&
          <li>
            <a
              href={props.contact.website}
              target='_blank'
              title={`Website of ${props.name}`}
              alt={`Website of ${props.name}`}
            >
              <i className="fas fa-globe"></i>
            </a>
          </li>
        }
        {props.contact.twitter &&
          <li>
            <a
              href={props.contact.twitter}
              target='_blank'
              title={`Twitter account of ${props.name}`}
              alt={`Twitter account of ${props.name}`}
            >
              <i className="fab fa-twitter-square"></i>
            </a>
          </li>
        }
        {props.contact.instagram &&
          <li>
            <a
              href={props.contact.instagram}
              target='_blank'
              title={`Instagram profil of ${props.name}`}
              alt={`Instagram profil of ${props.name}`}
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        }
        {props.contact.facebook &&
          <li>
            <a
              href={props.contact.facebook}
              target='_blank'
              title={`Facebook profil of ${props.name}`}
              alt={`Facebook profil of ${props.name}`}
            >
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
        }
      </ul>
    </React.Fragment>
  );
}

export default DetailsContact;