import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input } from 'semantic-ui-react';
import {
  getForecast, getLocation, getTemp, getNews,
} from '../store';
import TodaysForecast from './TodaysForecast';
import FiveDayForecast from './FiveDayForecast';
import Articles from './Articles';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      term: '',
      background: null,
    };
  }

  componentWillMount = () => {
    this.getLocation();
    this.getNews();
  }


  getNews = () => {
    getNews();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeolocationSuccess,
        this.handleGeolocationError,
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
      );
    }
  }

  updateLocation = (evt) => {
    evt.preventDefault();
    const self = this;
    const { value } = evt.target.location;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: value }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const position = {
          coords: {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
          },
        };
        self.handleGeolocationSuccess(position);
      } else {
        alert(`Something got wrong ${status}`);
      }
    });
    const form = document.getElementById('search-form');
    form.reset();
  }

  // Callback to handle success
  handleGeolocationSuccess = (position) => {
    const { coords } = position;
    getLocation(coords);
    getForecast(coords);
    getTemp(coords);
  }

  // Callback to handle error
  handleGeolocationError = (error) => {
    if (error.code === 1) {
      this.setState({ error: 'Please enable permissions to access location and reload the page' });
    } else if (error.code === 2 && error.message.match(/^Network location provider at 'https:\/\/www.googleapis.com\/' : Returned error code 403.$/)) {
      this.setState({ error: 'Seems like the internal service for geolocation is down. Please try in a few minutes!' });
    } else {
      this.setState({ error: 'Looks like something went wrong! Please refresh your browser...' });
      this.getLocation();
    }
  }

  // Renders the todays weather component
  renderTodaysWeather = () => {
    let component;
    const { forecast, location } = this.props;
    if (forecast.currently && location) {
      const currentWeather = forecast.currently;
      const { icons } = this.props;
      const { city } = location;
      component = (
        <TodaysForecast weather={currentWeather} icons={icons} city={city} />
      );
    }
    return component;
  }

  // Renders the 5 day forecast component
  render5DayForecast = () => {
    let component;
    const { forecast, location } = this.props;
    if (forecast.currently && location) {
      const days = forecast.daily.data.slice(0, 5);
      const { icons } = this.props;
      const { city } = location;
      component = (
        <div className="fiveday-wrapper">
          {days.map(weather => (
            <FiveDayForecast key={weather.time} weather={weather} icons={icons} city={city} />
          ))}
        </div>
      );
    }
    return component;
  }

  render() {
    const { error } = this.state;
    const {
      forecast, location, temp, news,
    } = this.props;
    if (error !== '') {
      return (
        <div className="error">
          <h3>{error}</h3>
        </div>
      );
    } if (forecast.length === 0 || !location) {
      return (
        <div className="loading">
          <img alt="loader" src="/style/img/umbrella.png" />
        </div>
      );
    }
    console.log(this.props);
    // if (!this.state.background) {
    // this.checkTemp();
    // }
    return (
      <div className={`forecast ${temp || '#eee'}`}>
        <div className="top">
          <div className="time">
            <h3>
              {new Date().toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </h3>
          </div>
          <Form id="search-form" onSubmit={this.updateLocation}>
            <Form.Field>
              <Input id="city-search" name="location" icon placeholder="Search by city...">
                <input />
                <Icon name="search" />
              </Input>
            </Form.Field>
          </Form>
        </div>
        <div className="todays-forecast">
          {this.renderTodaysWeather()}
          {this.render5DayForecast()}
        </div>
        <div className="bottom">
          <Articles articles={news.articles} />
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    forecast: state.forecast,
    location: state.location,
    icons: {
      'clear-day': 'wi wi-day-sunny',
      'clear-night': 'wi wi-night-clear',
      rain: 'wi wi-rain',
      snow: 'wi wi-snow',
      sleet: 'wi wi-rain-mix',
      wind: 'wi wi-cloudy-gusts',
      fog: 'wi wi-fog',
      cloudy: 'wi wi-cloudy',
      'partly-cloudy-day': 'wi wi-day-cloudy',
      'partly-cloudy-night': 'wi wi-night-alt-cloudy',
      hail: 'wi wi-hail',
      thunderstorm: 'wi wi-thunderstorm',
      tornado: 'wi wi-tornado',
    },
    temp: state.temp,
    news: state.news,
  };
}

App.propTypes = {
  forecast: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  temp: PropTypes.string.isRequired,
  news: PropTypes.object.isRequired,
  icons: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  getForecast,
  getLocation,
  getTemp,
  getNews,
})(App);
