import axios from "axios";
export const FETCH_PLANT_NET_PLANT_IDENTIFICATION = "FETCH_PLANT_NET_PLANT_IDENTIFICATION";
export const FETCH_TREFLE_PLANT_INFORMATION = "FETCH_TREFLE_PLANT_INFORMATION";

// Sends a get request to plant net for a plant identification based upon remote image urls
export const fetchPlantNetPlantIdentificationForRemoteImages = (imageUrlsForPlant, organsDisplayedinImages, guessedCategoryForPlant) => {
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
export const fetchPlantNetPlantIdentificationForLocalImages = (images, organsDisplayedinImages, guessedCategoryForPlant) => {
  debugger;
  const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.REACT_APP_PLANT_NET_API_KEY}`;
  let form = new FormData();
  form.append('organs', organsDisplayedinImages[0]);
  form.append('images', images[0])
  //form.append('images', fs.createReadStream(images[i]));
  debugger;
  const request = axios.post(baseUrl, form);
  return {
    type: FETCH_PLANT_NET_PLANT_IDENTIFICATION,
    payload: request
  }
}

//Sends a get request to trefle for plant information (Right now it returns all plants)
//TODO: Figure out the different types of requests we will need to make and set up an action for each one.
export const fetchTreflePlantInformation = (searchTerm) => {
  // Search for a plant by common name, scientific name, or other input field
  // https://trefle.io/api/v1/plants/search?q=${searchTerm}&token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s
  const url = `https://trefle.io/api/v1/plants?token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`
  const request = axios.get(url);
  return {
    type: FETCH_TREFLE_PLANT_INFORMATION,
    payload: request
  }
}