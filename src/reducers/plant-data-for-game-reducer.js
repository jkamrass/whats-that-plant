import {FETCH_TREFLE_GAME_INFORMATION, UPDATE_ANSWER} from "../actions/index";


const plantDataForGameReducer = (state = [], action) => {
  const randomValue = Math.floor(Math.random()*5);

  switch (action.type) {
    case FETCH_TREFLE_GAME_INFORMATION:
      const plantInfoForGame = action.payload.data.data.map(plant=> {
          return {
            id: plant.id,
            plantData: {
              imageUrl: plant.image_url,
              commonName: plant.common_name,
              familyCommonName: plant.family_common_name,
              scientificName: plant.scientific_name
            }
          }
      })
      const gameData = {
        plants: plantInfoForGame,
        answer: plantInfoForGame[randomValue].plantData.commonName,
        score: 0,
        numQuestions: 0
      }
      return gameData;
    
    case UPDATE_ANSWER:
      const newTurn = {
        answer: state.plants[randomValue].plantData.commonName,
        score: state.score,
        numQuestions: state.numQuestions + 1
      }
      if (action.payload){
        newTurn.score += 1;
      }
      
      // setAnswer(gameData[randomValue2].plantData.name);
      // setNumQuestions(numQuestions+1);
      //add to score if payload true
      return {...state, ...newTurn}
    default:
      return state;
  }
}

export default plantDataForGameReducer;