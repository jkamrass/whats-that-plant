import {FETCH_TREFLE_GAME_INFORMATION, UPDATE_ANSWER} from "../actions/index";


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
      console.log(action.payload);
      debugger;
      const plantInfoForGame = action.payload.map(plant=> {
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

      const plantsDisplayed = imageRandomizer(plantInfoForGame, 5);

      const gameData = {
        plants: plantInfoForGame,
        plantsDisplayed: plantsDisplayed,
        answer: plantsDisplayed[randomValue(5)].plantData.commonName,
        score: 0,
        numQuestions: 0
      }
      debugger;
      return gameData;
    
    case UPDATE_ANSWER:
      const plantDisplay = imageRandomizer(state.plants, 5);
    
      const newTurn = {
        answer: plantDisplay[randomValue(5)].plantData.commonName,
        plantsDisplayed: plantDisplay,
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