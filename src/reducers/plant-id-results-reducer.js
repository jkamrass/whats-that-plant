import { FETCH_PLANT_NET_PLANT_IDENTIFICATION } from '../actions/index';

const plantIdResultsReducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_PLANT_NET_PLANT_IDENTIFICATION:
      debugger;
      //Grabs the first and most likely returned object (Could return multiple if there are multiple possible matches in the future)
      const plantIdInfo = {
        matchScore: action.payload.data.results[0].score,
        scientificName: action.payload.data.results[0].species.scientificNameWithoutAuthor,
        commonNames: action.payload.data.results[0].species.commonNames,
        family: action.payload.data.results[0].species.family.scientificNameWithoutAuthor,
        genus: action.payload.data.results[0].species.genus.scientificNameWithoutAuthor,
      }
      return plantIdInfo;
    default:
      return state;
  }
}

export default plantIdResultsReducer;