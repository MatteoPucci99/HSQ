import { GET_PREJOBS } from "../actions/prejob";

const initialState = {
  content: [],
};

const prejobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PREJOBS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default prejobReducer;
