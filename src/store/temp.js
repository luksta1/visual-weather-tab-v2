import axios from 'axios';

export const SET_TEMP = 'SET_TEMP';

const checkTemp = (temp) => {
  let tempRange = '';
  if (temp <= 25) {
    tempRange = 'cold';
  } else if (temp > 25 && temp <= 50) {
    tempRange = 'cool';
  } else if (temp > 50 && temp <= 75) {
    tempRange = 'warm';
  } else if (temp > 75) {
    tempRange = 'hot';
  }
  return tempRange;
};


// Action-creator responsible for fetching weather forecast
export const setTemp = (temp) => {
  const action = { type: SET_TEMP, temp };
  return action;
};

// forecast thunks
export const getTemp = coords => (dispatch) => {
  const { latitude, longitude } = coords;
  axios.get(`api/forecast?latitude=${latitude}&longitude=${longitude}`)
    .then(res => res.data.currently.temperature)
    .then((temp) => {
      dispatch(setTemp(temp));
    });
};

// Returns the data from the api for the weather forecast.
export default function (state = 0, action) {
  switch (action.type) {
    case SET_TEMP:
      return checkTemp(action.temp);
    default:
      return state;
  }
}
