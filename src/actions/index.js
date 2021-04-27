import axios from "axios";
export const FETCH_PLANT_NET_PLANT_IDENTIFICATION = "FETCH_PLANT_NET_PLANT_IDENTIFICATION";
export const FETCH_TREFLE_PLANT_INFORMATION = "FETCH_TREFLE_PLANT_INFORMATION";


export function fetchPlantNetPlantIdentification (images) {
  //${process.env.REACT_APP_PLANT_NET_API_KEY}
  const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=2b10lU1HOxST6fgJyOL5dnd0Ze&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_1.jpeg&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_2.jpeg&organs=flower&organs=leaf`
  const request = axios.get(baseUrl);
  const test = `&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_1.jpeg&images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_2.jpeg&organs=flower&organs=leaf`
  return {
    type: FETCH_PLANT_NET_PLANT_IDENTIFICATION,
    payload: request
  }
}

export function fetchTreflePlantInformation (searchTerm) {
  const url = `https://trefle.io/api/v1/plants?token=1PYwkoMi5eekBlBShnMqKEeVEoHf-a_IhIxeGaG272s`
  const request = axios.get(url);
  return {
    type: FETCH_TREFLE_PLANT_INFORMATION,
    payload: request
  }
}