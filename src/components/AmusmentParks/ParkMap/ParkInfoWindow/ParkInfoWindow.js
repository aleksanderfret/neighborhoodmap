import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';
import ParkStreetView from './ParkStreetView/ParkStreetView';
import * as ParksAPI from '../../../../dataAPI/dataAPI';
import get from 'lodash/get';

class ParkInfoWindow extends Component {
  // Simple cache mechanism because of small daily API calls limit
  // Except of this is preserves app from proccessing the same data many times
  static cachedParkData = [];
  parkData = {};

  componentDidMount = () => {
    this.parkData = ParkInfoWindow.cachedParkData[this.props.park.id-1];
    if (this.parkData) return;

    ParksAPI.getParkData(this.props.park)
      .then((park) => {
        //console.log(JSON.stringify(park));
        this.parkData = this.prepareParkData(park);
        ParkInfoWindow.cachedParkData[this.props.park.id-1] = this.parkData;
      });
  }

  prepareParkContactLink = (baseURL, identifier) => {
    if (identifier) {
      return baseURL+identifier;
    }
    return undefined;
  }

  prepareParkHours = (timeframes) => {
    if (!timeframes) return undefined;
    const week = {Mon: '', Tue: '',Wed: '', Thu: '', Fri: '', Sat: '', Sun: ''};

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
    return week;
  }

  prepareHoursFromDaysRange = (week, day, hours) => {
    let weekDays = Object.keys(week);
    weekDays = [...weekDays,...weekDays];

    const daysRange = day.split('–');
    const firstDayIndex = weekDays.indexOf(daysRange[0]);
    let secondDayIndex = weekDays.indexOf(daysRange[1]);
    if (secondDayIndex<firstDayIndex) {
      secondDayIndex +=7;
    }

    for (let i=firstDayIndex; i<=secondDayIndex; i++) {
      week[weekDays[i]] = hours;
    }
  }

  prepareParkPhotoUrl = (prefix, size, sufix) => {
    if (prefix && sufix) {
      return prefix+size+sufix;
    }
    return undefined;
  }

  prepareParkData = (park) => {
    const parkData = {};
   parkData.name = park.name;
   parkData.address = {
      street: get(park, 'location.address'),
      city: `${get(park, 'location.postalCode')} ${get(park, 'location.city')}`,
      country: get(park, 'location.country')
    }

    if (park.venue) {
     parkData.contact = {
        phone: get(park, 'venue.contact.formattedPhone'),
        twitter: this.prepareParkContactLink('https://twitter.com/', get(park, 'venue.contact.twitter')),
        instagram: this.prepareParkContactLink('https://www.instagram.com/', get(park, 'venue.contact.instagram')),
        facebookUsername: this.prepareParkContactLink('https://www.facebook.com/', get(park, 'venue.contact.facebookUsername')),
      }
     parkData.seeMore = {
        foursquare: park.venue.canonicalUrl,
        park: park.venue.url
      };
     parkData.rating = {
        value: park.venue.rating,
        color: '#'+park.venue.ratingColor
      };
     parkData.description = park.venue.description;

     parkData.hours = this.prepareParkHours(get(park, 'venue.hours.timeframes'));
      this.bestPhotoUrl = this.prepareParkPhotoUrl(
        get(park, 'venue.bestPhoto.prefix'),
        '300x300',
        get(park, 'venue.bestPhoto.sufix')
      );
    }
    return parkData;
  }

  render () {
    const park = this.parkData;
    return(
      <InfoWindow
        onCloseClick={this.props.onCloseClick}
      >
        <div className='info-window'>
          <h2>{this.props.park.title}</h2>
          {/* <div id='streetview'>
            <ParkStreetView
              position={this.props.park.position}
            />
          </div> */}
        </div>
    </InfoWindow>
    );
  }
}

export default ParkInfoWindow;