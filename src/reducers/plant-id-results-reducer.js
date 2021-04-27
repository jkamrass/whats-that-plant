import { FETCH_PLANT_NET_PLANT_IDENTIFICATION, FETCH_TREFLE_INFO_FOR_ID } from '../actions/index';

const plantIdResultsReducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_PLANT_NET_PLANT_IDENTIFICATION:
      //Grabs the first and most likely returned object (TODO: Could change to return multiple if there are multiple possible matches in the future)
      debugger;
      const plantIdInfo = {
        matchScore: action.payload.data.results[0].score,
        scientificName: action.payload.data.results[0].species.scientificNameWithoutAuthor,
        commonNames: action.payload.data.results[0].species.commonNames,
        family: action.payload.data.results[0].species.family.scientificNameWithoutAuthor,
        genus: action.payload.data.results[0].species.genus.scientificNameWithoutAuthor,
        userImage: action.payload.data.query.images[0]
      }
      return plantIdInfo;

    case FETCH_TREFLE_INFO_FOR_ID:
      console.log(action.payload);
      debugger;
      return {
        ...state,
      primaryImage: action.payload.data.data.image_url};

    default:
      return state;
  }
}

export default plantIdResultsReducer;