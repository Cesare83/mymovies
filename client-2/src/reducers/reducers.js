//-------------------------------IMPORT MODULES---------------------------------
import { combineReducers } from 'redux';

import { SET_FILTER, SET_SORT_COLUMN, SET_MOVIES } from '../actions/actions.js';

//---------------------------------FUNCTIONS------------------------------------

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function sortColumn(state = 'title', action) {
  switch (action.type) {
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//don´t forget to "register" new reducers here!
const moviesApp = combineReducers({
  visibilityFilter,
  sortColumn,
  movies
});

export default moviesApp;
