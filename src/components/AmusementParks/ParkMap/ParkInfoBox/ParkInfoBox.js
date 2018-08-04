import React, { Component } from 'react';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import FocusLock from 'react-focus-lock';
import get from 'lodash/get';
import * as ParksAPI from '../../../../dataAPI/dataAPI';
import ParkInfoBoxHeader from './ParkInfoBoxDetails/ParkInfoBoxHeader';
import ParkInfoBoxDetails from './ParkInfoBoxDetails/ParkInfoBoxDetails';

class ParkInfoBox extends Component {

  state = {
    parkData: null,
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.onPressEscape);

    ParksAPI.getParkData(this.props.park)
      .then((park) => {
        const preparedData = this.prepareParkData(park);
        this.setState({
          parkData: preparedData,
        });
      });
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onPressEscape);
  };

  prepareParkContactLink = (baseURL, identifier) => {
    if (identifier) {
      return baseURL + identifier;
    }
    return undefined;
  };

  // hours from API differs much from format needed for the app,
  // so here are adequate transformations
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
  };

  prepareHoursFromDaysRange = (week, day, hours) => {
    let weekDays = Object.keys(week);
    // this is helper array that let us handle cases
    // when end of range exceeds Sunday
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
  };

  prepareParkPhotoUrl = (prefix, size, suffix) => {
    if (prefix && suffix) {
      return prefix + size + suffix;
    }
    return undefined;
  };

  prepareParkData = (park) => {
    if (!Object.keys(park).length){
      return {
        errorMessage: `Unfortunately data couldn't be loaded.`
      }
    }

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
  };

  closeInfoBox = () => {
    this.props.onCloseClick();
    this.props.adjustMapToPark();
    this.props.setAlignmentOnClose();
  };

  onPressEscape = (event) => {
    if (event.keyCode === 27) {
      this.closeInfoBox();
    }
  };

  render() {
    if (!this.state.parkData) {
      return null;
    }

    return (
      <InfoBox
        position={this.props.park.position}
        options={{
          boxClass: 'info-box',
          closeBoxURL: `assets/icons/close-info-box.svg`,
          closeBoxMargin: "-15px",
          alignBottom: this.props.alignBottom,
          pixelOffset: new window.google.maps.Size(-150, this.props.offset),
        }}
        onCloseClick={this.closeInfoBox}
      >
        <React.Fragment>
          <FocusLock
            returnFocus
          >
            <div
              className='park-details-container'
              aria-modal={true}
            >
              <ParkInfoBoxHeader
                name={this.props.park.title}
              />
              {this.state.parkData.errorMessage &&
                <div
                  className='park-data-error'
                >
                  {this.state.parkData.errorMessage}
                </div>
              }
              {!this.state.parkData.errorMessage &&
                <ParkInfoBoxDetails
                  name={this.props.park.title}
                  park={this.state.parkData}
                />
              }
            </div>
          </FocusLock>
        </React.Fragment>
      </InfoBox>
    );
  }
}

export default ParkInfoBox;