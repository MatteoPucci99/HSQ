import authReducer from "../reducers/auth";
import prejobReducer from "../reducers/prejob";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const myRecucer = combineReducers({
  prejob: prejobReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: myRecucer,
});

export default store;
