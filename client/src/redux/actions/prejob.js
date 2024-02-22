export const API = "http://localhost:5002/prejobs";
export const SEND_PREJOB = "SEND_PREJOB";
export const GET_PREJOBS = "GET_PREJOBS";

//Action per inviare un prejob
export const sendPrejobAction = (obj, handleSuccessAlert) => {
  return async (dispatch) => {
    fetch(`${API}/savedPrejobs`, {
      method: "POST",
      body: JSON.stringify(obj),
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
      .then((preJob) => {
        dispatch({
          type: SEND_PREJOB,
          payload: preJob,
        });
        handleSuccessAlert(true);
        dispatch(getPrejobAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Action per ottenere tutti i prejobs
export const getPrejobAction = () => {
  return async (dispatch) => {
    fetch(`${API}/savedPrejobs`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel caricamento dei dati");
        }
      })
      .then((prejobs) => {
        dispatch({
          type: GET_PREJOBS,
          payload: prejobs,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
