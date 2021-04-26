import {FETCH_TREFLE_PLANT_INFORMATION} from "../actions/index";

const plantDataForGameReducer = (state = {}, action) => {
  debugger;
  switch (action.type) {
    case FETCH_TREFLE_PLANT_INFORMATION:
      return state;
    default:
      return state;
  }
}

export default plantDataForGameReducer;