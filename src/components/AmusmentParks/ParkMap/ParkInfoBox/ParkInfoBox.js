import React, { Component } from 'react';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as ParksAPI from '../../../../dataAPI/dataAPI';
import get from 'lodash/get';

class ParkInfoBox extends Component {
  // Simple cache mechanism because of small daily API calls limit
  // Except of this is preserves app from proccessing the same data many times
  static cachedParkData = [];
  state = {
    parkData: null
  };

  componentDidMount = () => {
    const cachedData = ParkInfoBox.cachedParkData[this.props.park.id - 1];
    if (cachedData) {
      this.setState({
        parkData: cachedData,
      });
    } else {
      ParksAPI.getParkData(this.props.park)
        .then((park) => {
          //console.log(JSON.stringify(park));
          const preparedData = this.prepareParkData(park);
          this.setState({
            parkData: preparedData,
          });
          ParkInfoBox.cachedParkData[this.props.park.id - 1] = preparedData;
        });
    }
  }

  prepareParkContactLink = (baseURL, identifier) => {
    if (identifier) {
      return baseURL + identifier;
    }
    return undefined;
  }

  prepareParkHours = (timeframes) => {
    if (!timeframes) return undefined;
    const week = { Mon: '', Tue: '', Wed: '', Thu: '', Fri: '', Sat: '', Sun: '' };

    timeframes.forEach((timeframe) => {
      const days = timeframe.days.split(', ');
      const hours = get(timeframe, 'open[0].renderedTime');
      if (!hours) return;

      days.forEach((day) => {
        if (day.indexOf('–') === -1) {
          week[day] = hours;
        } else {
          this.prepareHoursFromDaysRange(week, day, hours);
        }
      });
    });

    const weekArray = [];
    const days = Object.keys(week);
    for (let day of days) {
      weekArray.push({ day: day, hours: week[day] });
    }
    return weekArray;
  }

  prepareHoursFromDaysRange = (week, day, hours) => {
    let weekDays = Object.keys(week);
    weekDays = [...weekDays, ...weekDays];

    const daysRange = day.split('–');
    const firstDayIndex = weekDays.indexOf(daysRange[0]);
    let secondDayIndex = weekDays.indexOf(daysRange[1]);
    if (secondDayIndex < firstDayIndex) {
      secondDayIndex += 7;
    }

    for (let i = firstDayIndex; i <= secondDayIndex; i++) {
      week[weekDays[i]] = hours;
    }
  }

  prepareParkPhotoUrl = (prefix, size, suffix) => {
    if (prefix && suffix) {
      return prefix + size + suffix;
    }
    return undefined;
  }

  prepareParkData = (park) => {
    const parkData = {};
    parkData.name = park.name;
    parkData.address = {
      name: park.name,
      street: get(park, 'location.address'),
      city: `${get(park, 'location.postalCode')} ${get(park, 'location.city')}`,
      country: get(park, 'location.country')
    }

    if (park.venue) {
      parkData.contact = {
        phone: get(park, 'venue.contact.formattedPhone'),
        twitter: this.prepareParkContactLink('https://twitter.com/', get(park, 'venue.contact.twitter')),
        instagram: this.prepareParkContactLink('https://www.instagram.com/', get(park, 'venue.contact.instagram')),
        facebook: this.prepareParkContactLink('https://www.facebook.com/', get(park, 'venue.contact.facebookUsername')),
        website: park.venue.url,
      }
      parkData.source = park.venue.canonicalUrl;
      parkData.rating = {
        value: park.venue.rating,
        color: '#' + park.venue.ratingColor
      };

      parkData.description = park.venue.description;

      parkData.hours = this.prepareParkHours(get(park, 'venue.hours.timeframes'));
      parkData.bestPhotoUrl = this.prepareParkPhotoUrl(
        get(park, 'venue.bestPhoto.prefix'),
        'width300',
        get(park, 'venue.bestPhoto.suffix')
      );
    }
    return parkData;
  }

  render() {
    if (!this.state.parkData) {
      return null;
    }
    const park = this.state.parkData;

    return (
      <InfoBox
       position={this.props.park.position}
        options={{
          boxClass:'info-box',
          closeBoxURL: `assets/icons/close-info-box.svg`,
          closeBoxMargin: "-15px",
          enableEventPropagation: true,
          alignBottom: true,
          pixelOffset: new window.google.maps.Size(-150, -60)
        }}
        onCloseClick={this.props.onCloseClick}
      >
      <React.Fragment>
        <div
          className='park-details-container'
        >
        <header>
          <h2
            className='park-name'
          >
            {this.props.park.title}
          </h2>
        </header>
          <div
            id='park-details'
            className='park-details'
          >
            {park.bestPhotoUrl &&
              <img
                className='park-image'
                src={park.bestPhotoUrl}
                alt={`${this.props.name} theme park`}
              />
            }
            {park.address &&
              <React.Fragment>
                <h3>Address</h3>
                <p className='park-addres'>
                  {park.address.name !== park.address.street &&
                    <React.Fragment>
                      {park.address.name}<br/>
                    </React.Fragment>
                  }
                  {park.address.street}<br/>
                  {park.address.city}<br/>
                  {park.address.country}
                </p>
              </React.Fragment>
            }
            {park.contact &&
              <React.Fragment>
                <h3>Contact</h3>
                <ul className='park-contact'>
                  {park.contact.phone &&
                    <li>{`phone: ${park.contact.phone}`}</li>
                  }
                  {park.contact.website &&
                    <li>
                      <a
                        href={park.contact.website}
                        title={`Website of ${this.props.park.title}`}
                        alt={`Website of ${this.props.park.title}`}
                      >
                        <i className="fas fa-globe"></i>
                      </a>
                    </li>
                  }
                  {park.contact.twitter &&
                    <li>
                      <a
                        href={park.contact.twitter}
                        title={`Twitter account of ${this.props.park.title}`}
                        alt={`Twitter account of ${this.props.park.title}`}
                      >
                        <i className="fab fa-twitter-square"></i>
                      </a>
                    </li>
                  }
                  {park.contact.instagram &&
                    <li>
                      <a
                        href={park.contact.instagram}
                        title={`Instagram profil of ${this.props.park.title}`}
                        alt={`Instagram profil of ${this.props.park.title}`}
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  }
                  {park.contact.facebook &&
                    <li>
                      <a
                        href={park.contact.facebook}
                        title={`Facebook profil of ${this.props.park.title}`}
                        alt={`Facebook profil of ${this.props.park.title}`}
                      >
                        <i className="fab fa-facebook-square"></i>
                      </a>
                    </li>
                  }
                </ul>
              </React.Fragment>
            }
            {park.hours &&
              <React.Fragment>
                <h3>Opening hours</h3>
                <table className='park-open-hours'>
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {park.hours.map((hour, index) => (
                      <tr key={index}>
                        <td>{hour.day}</td>
                        <td>{hour.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            }
            {park.description &&
              <React.Fragment>
                <h3>Description</h3>
                <p className='park-description'>{park.description}</p>
              </React.Fragment>
            }
            {park.source &&
              <React.Fragment>
                <h3>Data source</h3>
                <a
                  className='source-link'
                  href={park.source}
                  target="_blank"
                >
                  Foursquare
                </a>
              </React.Fragment>
            }
          </div>
        </div>
        </React.Fragment>
      </InfoBox>
    );
  }
}

export default ParkInfoBox;