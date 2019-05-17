import axios from 'axios';
import { getForecast } from './forecast';
import { getTemp } from './temp';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

const INITIAL_STATE = {
  city: '',
  coords: {
    long: 0,
    lat: 0,
  },
};

// Action-creator responsible for fetching weather location
export const fetchLocation = (city) => {
  const action = { type: FETCH_LOCATION, city };
  return action;
};

export const updateCity = (city, coords) => {
  const action = { type: UPDATE_LOCATION, city, coords };
  return action;
};

// Returns the data from the api for the weather location.
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        city: action.city,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        city: action.city,
        coords: {
          long: action.coords.longitude,
          lat: action.coords.latitude,
        },
      };
    default:
      return state;
  }
}

// location thunks
export const getLocation = () => (dispatch) => {
  axios.get('http://ip-api.com/json/')
    .then(res => dispatch(fetchLocation(res.data.city)));
};

export const updateLocation = city => (dispatch) => {
  axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=${city}&app_id=ctZsvJnnjyOHswEDqRvy&app_code=d6nPLT_HCw4a7MIccx0BkQ`)
    .then((res) => {
      console.log('RES', res.data);
      const coords = {
        latitude: res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
        longitude: res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
      };
      console.log('COORDS', coords);
      dispatch(updateCity(city, coords));
      dispatch(getForecast(coords));
      dispatch(getTemp(coords));
    });
};
