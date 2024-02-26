// signin : /signin    signup: /signup
import * as api from "../../api/index.js";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

//Funzione per il signIN
export const signInAction = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);

    localStorage.setItem("profile", JSON.stringify(data));
    dispatch({ type: AUTH, payload: data });
    navigate("/home");
  } catch (error) {
    console.log(error);
  }
};
//Funzione per il signUp
export const signUpAction = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);

    localStorage.setItem("profile", JSON.stringify(data));
    dispatch({ type: AUTH, payload: data });
    navigate("/home");
  } catch (error) {
    console.log(error);
  }
};
