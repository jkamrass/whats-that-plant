import { FETCH_PLANT_NET_PLANT_IDENTIFICATION, FETCH_TREFLE_INFO_FOR_ID } from '../actions/index';

const plantIdResultsReducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_PLANT_NET_PLANT_IDENTIFICATION:
      //Grabs the first and most likely returned object (TODO: Could change to return multiple if there are multiple possible matches in the future)
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
      const updatedPlantInfoTreffle = {
        primaryImage: action.payload.data.data.image_url,
        commonName: [action.payload.data.data.common_name],
        commonFamilyName: action.payload.data.data.family_common_name,
        plantNetPageUrl: action.payload.data.data.sources.find((source) => source.name === "PlantNet")?.url,
        wikiUrl: action.payload.data.data.sources.find((source) => source.id === state.scientificName && source.name === "Wikipedia")?.url,
      }
      debugger;
      return {
        ...state,
        ...updatedPlantInfoTreffle
      };

    default:
      return state;
  }
}

export default plantIdResultsReducer;