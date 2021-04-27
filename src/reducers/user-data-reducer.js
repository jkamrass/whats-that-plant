import { UPDATE_USER_IMAGE } from '../actions/index';

const userDataReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_USER_IMAGE:
      //Grabs the first and most likely returned object (TODO: Could change to return multiple if there are multiple possible matches in the future)
      debugger;
      const userData = {
        userImageUrl: action.payload
      }
      return userData;
    default:
      return state;
  }
}

export default userDataReducer;