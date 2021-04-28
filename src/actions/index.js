import axios from "axios";
export const FETCH_PLANT_NET_PLANT_IDENTIFICATION = "FETCH_PLANT_NET_PLANT_IDENTIFICATION";
export const FETCH_TREFLE_GAME_INFORMATION = "FETCH_TREFLE_PLANT_INFORMATION";
export const UPDATE_USER_IMAGE = 'UPDATE_USER_IMAGE';
export const FETCH_TREFLE_INFO_FOR_ID = 'FETCH_TREFLE_INFO_FOR_ID';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

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

//Sends a get request to trefle for plant information (Right now it returns all plants)
//TODO: Figure out the different types of requests we will need to make and set up an action for each one.
export const fetchTrefleGameInformation = (searchTerm) => {
  // Search for a plant by common name, scientific name, or other input field
  // https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  const url = `https://trefle.io/api/v1/plants?filter%5Bfamily_name%5D=Brassicaceae&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`
  const request = axios.get(url);
  return {
    type: FETCH_TREFLE_GAME_INFORMATION,
    payload: request
  }
}

export const updateAnswer = (correctAnswer) =>{
  return {
    type: UPDATE_ANSWER,
    payload: correctAnswer
  }
};

export const updateUserImage = (imageUrl) => {
  return {
    type: UPDATE_USER_IMAGE,
    payload: imageUrl
  }
};