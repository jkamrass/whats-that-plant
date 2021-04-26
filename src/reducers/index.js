import { combineReducers } from 'redux';
import plantIdResultsReducer from './plant-id-results-reducer';
import plantDataForGameReducer from './plant-data-for-game-reducer';

const rootReducer = combineReducers({
  plantIdResults: plantIdResultsReducer,
  plantDataForGame: plantDataForGameReducer
})

export default rootReducer;