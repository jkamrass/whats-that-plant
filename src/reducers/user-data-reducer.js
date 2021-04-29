import { UPDATE_USER_IMAGES } from '../actions/index';

const userDataReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_USER_IMAGES:
      const userData = {
        userImageUrls: action.payload
      }
      return userData;
    default:
      return state;
  }
}

export default userDataReducer;