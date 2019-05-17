import axios from 'axios';

export const FETCH_LOCATION = 'FETCH_LOCATION';

const INITIAL_STATE = {};

// Action-creator responsible for fetching weather location
export const fetchLocation = (coords) => {
  const action = { type: FETCH_LOCATION, coords };
  return action;
};

// Returns the data from the api for the weather location.
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return action.coords;
    default:
      return state;
  }
}

// location thunks
export const getLocation = coords => (dispatch) => {
  const { latitude, longitude } = coords;
  axios.get(`api/location?latitude=${latitude}&longitude=${longitude}`)
    .then(res => dispatch(fetchLocation(res.data)));
};
