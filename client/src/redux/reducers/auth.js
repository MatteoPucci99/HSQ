import { AUTH, LOGOUT } from "../actions/auth";

const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        authData: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
