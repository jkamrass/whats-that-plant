import axios from "axios";
export const FETCH_PLANT_NET_PLANT_IDENTIFICATION = "FETCH_PLANT_NET_PLANT_IDENTIFICATION";
export const FETCH_TREFLE_GAME_INFORMATION = "FETCH_TREFLE_GAME_INFORMATION";
export const UPDATE_USER_IMAGES = 'UPDATE_USER_IMAGES';
export const FETCH_TREFLE_INFO_FOR_ID = 'FETCH_TREFLE_INFO_FOR_ID';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_PLANTS_DISPLAYED = 'UPDATE_PLANTS_DISPLAYED';
export const TREFLE_FETCH_FAILED = "TREFLE_FETCH_FAILED";
export const BOTH_FETCHES_FAILED = "BOTH_FETCHES_FAILED";
export const RESET_ID_SEARCH = "RESET_ID_SEARCH";
export const RESET_GAME_INFORMATION = "RESET_GAME_INFORMATION";

// Sends a get request to plant net for a plant identification based upon remote image urls
export const fetchPlantNetPlantIdUrl = (imageUrlsForPlant, organsDisplayedinImages, guessedCategoryForPlant) => {
  const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}`;
  const encodedImageUrls = imageUrlsForPlant.map((imageUrl) => encodeURIComponent(imageUrl));
  const imagesPartOfRequestUrl = encodedImageUrls.reduce((imagesUrlPortion, imageUrl) => `${imagesUrlPortion}&images=${imageUrl}`, '');
  const organsPartOfRequestUrl = organsDisplayedinImages.reduce((organsUrlPortion, organ) => `${organsUrlPortion}&organs=${organ}`, '');
  const url = baseUrl+imagesPartOfRequestUrl+organsPartOfRequestUrl;
  // const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_1.jpeg&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_2.jpeg&organs=flower&organs=leaf`
  const request = axios.get(url);
  return {
    type: FETCH_PLANT_NET_PLANT_IDENTIFICATION,
    payload: request
  }
}


// Sends a post request to plant net for a plant identification based upon uploaded local images
export const fetchPlantNetPlantIdLocal = (images, organsDisplayedinImages, userImage, guessedCategoryForPlant) => {
  const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}`;
  let form = new FormData();
  form.append('organs', organsDisplayedinImages[0]);
  form.append('images', images[0])
  //form.append('images', fs.createReadStream(images[i]));
  const request = axios.post(baseUrl, form);
  return {
    type: FETCH_PLANT_NET_PLANT_IDENTIFICATION,
    payload: request
  }
}

//Sends a get request to trefle for plant information (Right now it returns all plants)
//TODO: Figure out the different types of requests we will need to make and set up an action for each one.
export const fetchTrefleInfoForId = (scientificName) => {
  // Search for a plant by common name, scientific name, or other input field

  const idToRetrieve = scientificName.toLowerCase().replace(' ', '-');
  const url = `https://trefle.io/api/v1/species/${idToRetrieve}?token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`
  const request = axios.get(url);
  return {
    type: FETCH_TREFLE_INFO_FOR_ID,
    payload: request
  }
}

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
    type: FETCH_TREFLE_INFO_FOR_ID,
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
    type: FETCH_TREFLE_INFO_FOR_ID,
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
  }

  return {
    type: FETCH_TREFLE_GAME_INFORMATION,
    payload: {
      plants: plantsList,
      numImages: numImagesToDisplay 
    }
  }
}

export const resetGameInformation = () => {
  return {
    type: RESET_GAME_INFORMATION
  }
}


export const updateAnswer = (correctAnswer) =>{
  return {
    type: UPDATE_ANSWER,
    payload: correctAnswer
  }
};

export const updateUserImages = (imageUrls) => {
  return {
    type: UPDATE_USER_IMAGES,
    payload: imageUrls
  }
};
