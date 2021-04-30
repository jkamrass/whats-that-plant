import { UPDATE_USER_IMAGES, RESET_ID_SEARCH } from '../actions/index';

const userDataReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_USER_IMAGES:
      const userData = {
        userImageUrls: action.payload
      }
      return userData;
    case RESET_ID_SEARCH:
      return {}
    default:
      return state;
  }
}

export default userDataReducer;