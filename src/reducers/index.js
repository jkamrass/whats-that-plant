import { combineReducers } from 'redux';
import plantIdResultsReducer from './plant-id-results-reducer';
import plantDataForGameReducer from './plant-data-for-game-reducer';
import userDataReducer from './user-data-reducer'

const rootReducer = combineReducers({
  plantIdResults: plantIdResultsReducer,
  plantDataForGame: plantDataForGameReducer,
  userData: userDataReducer
})

export default rootReducer;