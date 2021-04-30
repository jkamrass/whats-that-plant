import axios from "axios";
export const FETCH_TREFLE_GAME_INFORMATION = "FETCH_TREFLE_GAME_INFORMATION";
export const UPDATE_USER_IMAGES = 'UPDATE_USER_IMAGES';
export const FETCH_ID_RESULTS = 'FETCH_ID_RESULTS';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const TREFLE_FETCH_FAILED = "TREFLE_FETCH_FAILED";
export const BOTH_FETCHES_FAILED = "BOTH_FETCHES_FAILED";
export const RESET_ID_SEARCH = "RESET_ID_SEARCH";
export const RESET_GAME_INFORMATION = "RESET_GAME_INFORMATION";
export const UPDATE_SCORE_MULTIPLE_CHOICE = 'UPDATE_SCORE_MULTIPLE_CHOICE'

export const fetchIdResultsLocal = (images, organsDisplayedinImages) => {

  const fetchStuff = async (images, organsDisplayedinImages) => {
    try{
      const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}`;
      let form = new FormData();
      for (let i = 0; i < images.length; i++) {
        form.append('organs', organsDisplayedinImages[0]);
        form.append('images', images[0].image)
      }
    
      //form.append('images', fs.createReadStream(images[i]));
      const idRequest = await axios.post(baseUrl, form);
      console.log(idRequest);
      const matchScore = idRequest.data.results[0].score;
      const idToRetrieve = idRequest.data.results[0].species.scientificNameWithoutAuthor.toLowerCase().replace(' ', '-');
      const url = `https://trefle.io/api/v1/species/${idToRetrieve}?token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`
  
      try {
        const trefleRequest = await axios.get(url);
        return {...trefleRequest, match: matchScore}

      } catch (e) {
        console.error(e)
        const plantNetData = idRequest.data.results[0];
        const idInfo = {
          matchScore: plantNetData.score,
          scientificName: plantNetData.species.scientificNameWithoutAuthor,
          commonNames: plantNetData.species.commonNames,
          family: plantNetData.species.family.scientificNameWithoutAuthor,
          genus: plantNetData.species.genus.scientificNameWithoutAuthor,
          commonName: plantNetData.species.commonNames[0],
          primaryImage: `https://lh3.googleusercontent.com/proxy/kTSSCElmlybfSkvwwF0EuE_OMZ1BQkUm6xa3HGYhnYsbCXBGohx3JgsybIPyNhWi_WZViY1OA8BviTMCaH8IAphOICJkVzhCtaLHTHjJTvjxSL834tXmfUlOE8F50nR_pw`,
          error: TREFLE_FETCH_FAILED
        }
        debugger;
        return idInfo;
      }
    } catch (e) {
      console.error(e)
      return {error: BOTH_FETCHES_FAILED}
    }
  }

  return {
    type: FETCH_ID_RESULTS,
    payload: fetchStuff(images, organsDisplayedinImages)
  }
}

export const fetchIdResultsUrl = (imageUrlsForPlant, organsDisplayedinImages) => {

  const fetchStuff = async (imageUrlsForPlant, organsDisplayedinImages) => {
    try {
      const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}`;
      const encodedImageUrls = imageUrlsForPlant.map((imageUrl) => encodeURIComponent(imageUrl));
      const imagesPartOfRequestUrl = encodedImageUrls.reduce((imagesUrlPortion, imageUrl) => `${imagesUrlPortion}&images=${imageUrl}`, '');
      const organsPartOfRequestUrl = organsDisplayedinImages.reduce((organsUrlPortion, organ) => `${organsUrlPortion}&organs=${organ}`, '');
      const finalUrl = baseUrl+imagesPartOfRequestUrl+organsPartOfRequestUrl;
      const idRequest = await axios.get(finalUrl);
      console.log(idRequest);
      const matchScore = idRequest.data.results[0].score;
      const idToRetrieve = idRequest.data.results[0].species.scientificNameWithoutAuthor.toLowerCase().replace(' ', '-');
      const url = `https://trefle.io/api/v1/species/${idToRetrieve}?token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`

      try {
        const trefleRequest = await axios.get(url);
        return {...trefleRequest, match: matchScore}

      } catch (e) {
        console.error(e)
        const plantNetData = idRequest.data.results[0];
        const idInfo = {
          matchScore: plantNetData.score,
          scientificName: plantNetData.species.scientificNameWithoutAuthor,
          commonNames: plantNetData.species.commonNames,
          family: plantNetData.species.family.scientificNameWithoutAuthor,
          genus: plantNetData.species.genus.scientificNameWithoutAuthor,
          commonName: plantNetData.species.commonNames[0],
          primaryImage: `https://lh3.googleusercontent.com/proxy/kTSSCElmlybfSkvwwF0EuE_OMZ1BQkUm6xa3HGYhnYsbCXBGohx3JgsybIPyNhWi_WZViY1OA8BviTMCaH8IAphOICJkVzhCtaLHTHjJTvjxSL834tXmfUlOE8F50nR_pw`,
          error: TREFLE_FETCH_FAILED
        }
        debugger;
        return idInfo;
      }
    } catch (e) {
      console.error(e)
      return {error: BOTH_FETCHES_FAILED}
    }
  }
  // const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_1.jpeg&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_2.jpeg&organs=flower&organs=leaf`
  return {
    type: FETCH_ID_RESULTS,
    payload: fetchStuff(imageUrlsForPlant, organsDisplayedinImages)
  }
}

export const resetIdSearch = () => {
  return {
    type: RESET_ID_SEARCH
  }
}

//Sends a get request to trefle for plant information (Right now it returns all plants)
//TODO: Figure out the different types of requests we will need to make and set up an action for each one.
export const fetchTrefleGameInformation = async (numImagesToDisplay) => {
  // Search for a plant by common name, scientific name, or other input field
  // https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  //Brassicas: https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  //Edibles: https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  let plantsList = [];
  for (let page = 1; page <=5 ; page++) {
    const url = `https://trefle.io/api/v1/plants?filter_not%5Bcommon_name%5D=null&filter_not%5Bimage_url%5D=null&order%5Bsources_count%5D=desc&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s&page=${page}`
    const request = await axios.get(url);
    plantsList = [...plantsList, ...request.data.data];
    console.log(plantsList);
  }

  return {
    type: FETCH_TREFLE_GAME_INFORMATION,
    payload: {
      plants: plantsList,
      numImages: numImagesToDisplay 
    }
  }
}

//Not Currently in use, but updates the function to fetch game to use promise.all to handle all promises at once
export const fetchTrefleGameInformationFaster = (numImagesToDisplay) => {
  // Search for a plant by common name, scientific name, or other input field
  // https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  //Brassicas: https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  //Edibles: https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  const createPlantList = async (numImagesToDisplay) => {
    let requestList = [];
    for (let page = 1; page <= 5; page++) {
      const url = `https://trefle.io/api/v1/plants?filter_not%5Bcommon_name%5D=null&filter_not%5Bimage_url%5D=null&order%5Bsources_count%5D=desc&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s&page=${page}`
      requestList.push(axios.get(url))
      console.log(requestList);
      debugger;
    }
    console.log(requestList);
    const allData = await Promise.all(requestList)
    const plantsList = allData.reduce((acc, onePageData) => [...acc, ...onePageData.data.data], [])
    console.log(plantsList);
    // plantsList = [...plantsList, ...request.data.data];
    return {
      plants: plantsList,
      numImages: numImagesToDisplay
    }
  }

  return {
    type: FETCH_TREFLE_GAME_INFORMATION,
    payload: createPlantList(numImagesToDisplay)
  }
}

export const resetGameInformation = () => {
  return {
    type: RESET_GAME_INFORMATION
  }
}

export const updateScoreMultipleChoice = (correctAnswer) => {
  console.log(correctAnswer)
  debugger;
  return {
    type: UPDATE_SCORE_MULTIPLE_CHOICE,
    payload: correctAnswer
  }
}


export const updateAnswer = (lastAnswer) =>{
  return {
    type: UPDATE_ANSWER,
    payload: lastAnswer
  }
};

export const updateUserImages = (imageUrls) => {
  return {
    type: UPDATE_USER_IMAGES,
    payload: imageUrls
  }
};
