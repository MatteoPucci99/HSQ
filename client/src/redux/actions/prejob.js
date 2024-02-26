import * as api from "../../api/index.js";
export const SEND_PREJOB = "SEND_PREJOB";
export const GET_PREJOBS = "GET_PREJOBS";

//Funzione per creare un prejob
export const sendPrejobAction = (obj) => async (dispatch) => {
  try {
    const { data } = await api.sendPreJob(obj);
    dispatch({ type: SEND_PREJOB, payload: data });
    dispatch(getPrejobAction());
  } catch (error) {
    console.log(error);
  }
};

//Funzione per ricevere tutti i prejobs
export const getPrejobAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPreJob();
    dispatch({ type: GET_PREJOBS, payload: data });
  } catch (error) {}
};
