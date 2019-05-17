import axios from 'axios';

export const FETCH_NEWS = 'FETCH_NEWS';

const INITIAL_STATE = {};

// Action-creator responsible for fetching weather location
export const fetchNews = (news) => {
  const action = { type: FETCH_NEWS, news };
  return action;
};

// Returns the data from the api for the weather location.
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NEWS:
      return action.news;
    default:
      return state;
  }
}

// location thunks
export const getNews = () => (dispatch) => {
  axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=49e0f50f57b34a538988ff37b4afb2b3')
    .then(res => dispatch(fetchNews(res.data)));
};
