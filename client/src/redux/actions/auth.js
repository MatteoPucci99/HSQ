import { API } from "./prejob"; // signin : /signin    signup: /signup
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

export const signInAction = (userData, navigate) => {
  return async (dispatch) => {
    fetch(`${API}/signin`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel invio dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: AUTH,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const signUpAction = (userData, navigate) => {
  return async (dispatch) => {
    fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel invio dei dati");
        }
      })
      .then((data) => {
        dispatch({
          type: AUTH,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
