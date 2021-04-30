import {FETCH_TREFLE_GAME_INFORMATION, RESET_GAME_INFORMATION, GET_NEW_QUESTION, UPDATE_SCORE_MULTIPLE_CHOICE} from "../actions/index";
import _ from 'lodash';


const plantDataForGameReducer = (state = [], action) => {
  const randomValue = (param) => Math.floor(Math.random()*param);

  const imageRandomizer = (array, numImages) => {
    const plantsForDisplay = [];
    const arrayCopy = [...array]
    for (let i = 0; i < numImages; i++) {
      plantsForDisplay.push(arrayCopy.splice(randomValue(arrayCopy.length), 1))
    }
    return plantsForDisplay.flat();
  }

  switch (action.type) {
    case FETCH_TREFLE_GAME_INFORMATION:
      const numImages = action.payload.numImages;
      const plantInfoForGame = action.payload.plants.map(plant=> {
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

      const plantsDisplayed = imageRandomizer(plantInfoForGame, numImages);

      const gameData = {
        plants: plantInfoForGame,
        plantsDisplayed: plantsDisplayed,
        answer: plantsDisplayed[randomValue(numImages)].plantData.commonName,
        score: 0,
        numQuestions: 0
      }
      return gameData;

    case UPDATE_SCORE_MULTIPLE_CHOICE:
      const newScore = {
        score: action.payload ? state.score+1 : state.score,
        numQuestions: state.numQuestions+1
      }
      return {...state, ...newScore}
    
    case GET_NEW_QUESTION:
      const withoutLastAnswer = state.plants.filter(plant => plant.plantData.commonName !== action.payload)

      const plantDisplay = imageRandomizer(withoutLastAnswer, 4);
    
      const newTurn = {
        answer: plantDisplay[randomValue(4)].plantData.commonName,
        plantsDisplayed: plantDisplay
      }

      return {...state, ...newTurn, plants: withoutLastAnswer}
    
    case RESET_GAME_INFORMATION:
      return [];

    default:
      return state;
  }

  
}

export default plantDataForGameReducer;