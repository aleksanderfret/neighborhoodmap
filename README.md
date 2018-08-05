# Neighborhood Map (React)
Neighborhood Map - React (Amusement Parks) was created as a project within the Google Scholarship Programm.
See it in the web [Amusement Parks](http://www.amusementparks.fret.com.pl).

## Version
1.0.1. - 2018.08.05

## Technologies
React, Redux, JavaScript, CSS, HTML.

## Install, run, build
To get started developing right away:
* clone or download neighborhoodmap repository
* install all project dependencies with `npm install`
* start the development server with `npm start`
* to build application run `npm run build`

## Important notices
* My Google Maps API key is restricted to my own domain [Amusement Parks](http://www.amusementparks.fret.com.pl). So if you want to run application locally, you need to put your own Google Maps API key [here](https://github.com/alemikolo/neighborhoodmap/blob/master/src/components/AmusementParks/AmusementParks.js#L72).
* ServiceWorkers run only with https or on localhost. Because this site uses http, you can test serviceworker on localhost only. Keep in mind, that in this case you won't see Google Map, until you provide your own API key (look at the notice above).

## Additional technical information
Project was created with [create-react-app](https://github.com/facebook/create-react-app). Following dependencies were added:
* [redux](https://redux.js.org/)
* [react-redux](https://github.com/reduxjs/react-redux)
* [google-react-maps](https://github.com/tomchentw/react-google-maps)
* [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp)
* [react-focus-lock](https://github.com/theKashey/react-focus-lock)
* [react-async-script-loader](https://github.com/leozdgao/react-async-script-loader)

## APIs
* [Google Maps](https://cloud.google.com/maps-platform/)
* [Foursquare](https://developer.foursquare.com/)

## Contribution
This project (frontend-nanodegree-myreads) was #madewithudacity and #googleudacityscholars. Thank you.

## License
The MIT License (MIT)
