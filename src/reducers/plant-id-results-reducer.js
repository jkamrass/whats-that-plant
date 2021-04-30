import { BOTH_FETCHES_FAILED, FETCH_ID_RESULTS, TREFLE_FETCH_FAILED, RESET_ID_SEARCH } from '../actions/index';

const plantIdResultsReducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_ID_RESULTS:
      console.log(action.payload);
      //Tests to see if no errors came up with either of the fetch requests
      if (!action.payload.error) {
        debugger;
        const data = action.payload.data.data
        const updatedPlantInfoTreffle = {
          matchScore: action.payload.match,
          scientificName: data.scientific_name,
          commonNames: data.common_names.eng || data.common_names.en,
          family: data.family,
          genus: data.genus,
          primaryImage: data.image_url,
          commonName: [data.common_name],
          commonFamilyName: data.family_common_name,
          plantNetPageUrl: data.sources.find((source) => source.name === "PlantNet")?.url,
          wikiUrl: data.sources.find((source) => source.id === data.scientific_name && source.name === "Wikipedia")?.url,
        }
        return {
          ...state,
          ...updatedPlantInfoTreffle
        };
      } else {
        debugger;
        return action.payload.error === TREFLE_FETCH_FAILED ? action.payload : {error: BOTH_FETCHES_FAILED}
      }
    
    case RESET_ID_SEARCH:
      debugger;
      return {}

    default:
      return state;
  }
}

export default plantIdResultsReducer;