import React, { Component } from 'react';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as ParksAPI from '../../../../dataAPI/dataAPI';
import get from 'lodash/get';

class ParkInfoBox extends Component {
  // Simple cache mechanism because of small daily API calls limit
  // Except of this is preserves app from proccessing the same data many times
  static cachedParkData = [];

  state = {
    parkData: null,
    isInfoBoxRendered: false
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.onPressEscape);
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

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onPressEscape);
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

  // setTimeout used because of strange errors when code
  // was run synchronously - ref.focus() didn't work then
  onInfoBoxheaderRef = (ref) => {
    setTimeout(()=> {
      this.focusedBefore = document.activeElement;
      if(ref) {
        ref.focus();
      }
    }, 0);
  }

  closeInfoBox = () => {
    this.props.onCloseClick();
    this.props.adjustMapToPark();
    if (this.focusedBefore) {
      this.focusedBefore.focus();
    }
    this.props.setAlignmentOnClose();
  }

  onPressEscape = (event) => {
    if(event.keyCode === 27){
      this.closeInfoBox();
    }
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
          alignBottom: this.props.alignBottom,
          pixelOffset: new window.google.maps.Size(-150, this.props.offset),
        }}
        onCloseClick={this.closeInfoBox}
        ref={(ref) => {this.infoBox = ref}}
      >
      <React.Fragment>
        <div
          className='park-details-container'
          aria-modal={true}
        >
        <header>
          <h3
            className='park-name'
            tabIndex={-1}
            ref={(ref) => { this.onInfoBoxheaderRef(ref)}}
            aria-labelledby='descriptionClose'
          >
            {this.props.park.title}
          </h3>
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
                <h4>Address</h4>
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
                <h4>Contact</h4>
                <ul className='park-contact'>
                  {park.contact.phone &&
                    <li className='park-phone'>{`phone: ${park.contact.phone}`}</li>
                  }
                  {park.contact.website &&
                    <li>
                      <a
                        href={park.contact.website}
                        target='_blank'
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
                        target='_blank'
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
                        target='_blank'
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
                        target='_blank'
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
                <h4>Opening hours</h4>
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
                <h4>Description</h4>
                <p className='park-description'>{park.description}</p>
              </React.Fragment>
            }
            {park.source &&
              <React.Fragment>
                <h4>Data source</h4>
                <a
                  className='source-link'
                  href={park.source}
                  target="_blank"
                >
                  Foursquare
                </a>
              </React.Fragment>
            }
            <p id="descriptionClose">{`Information about ${this.props.park.title} amusement park. Close this infobox by pressing escape button.`}</p>
          </div>
        </div>
        </React.Fragment>
      </InfoBox>
    );
  }
}

export default ParkInfoBox;