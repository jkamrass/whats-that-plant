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
        genus: action.payload.data.results[0].species.genus.scientificNameWithoutAuthor
      }
      return plantIdInfo;

    case FETCH_TREFLE_INFO_FOR_ID:
      console.log(action.payload);
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