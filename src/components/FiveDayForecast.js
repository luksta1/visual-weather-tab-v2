import React from 'react';
import PropTypes from 'prop-types';

/** Stateless functional component responsible for rendering the max and min
* temp.
*/
const FiveDayForecast = ({ weather, icons }) => (
  <div className="fiveday-single">
    <div className="fiveday-temp">
      <h1 title="Temp"><i className={icons[weather.icon]} /></h1>
      <h3>{weather.temperatureHigh.toFixed(0)}&deg;/{weather.temperatureLow.toFixed(0)}&deg;</h3>
    </div>
    <div className="fiveday-info">
      <h4><i className="wi wi-raindrops" /> <span>{(weather.precipProbability * 100).toFixed(0)}%</span></h4>
    </div>
  </div>
);

FiveDayForecast.propTypes = {
  weather: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
};

export default FiveDayForecast;
