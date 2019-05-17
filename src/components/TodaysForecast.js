import React from 'react';
import PropTypes from 'prop-types';

/** Stateless functional component responsible for rendering the max and min
* temp.
*/
const TodaysForecast = ({ weather, icons, city }) => (
  <div className="today-wrapper">
    <div className="today-temp">
      <h1 title="Current Temp"><i className={icons[weather.icon]} /> {weather.temperature.toFixed(0)}&deg;</h1>
    </div>
    <div className="today-info">
      <h1>{city}</h1>
      <h4>{weather.summary}</h4>
      <h4><i className="wi wi-raindrops" /> <span>{(weather.precipProbability * 100).toFixed(0)}%</span></h4>
    </div>
  </div>
);

TodaysForecast.propTypes = {
  weather: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
};

export default TodaysForecast;
