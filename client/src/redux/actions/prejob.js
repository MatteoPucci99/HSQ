export const API = "http://localhost:5002/prejobs";
export const SEND_PREJOB = "SEND_PREJOB";
export const GET_PREJOBS = "GET_PREJOBS";

// Funzione per l'invio di richieste con l'header di autorizzazione aggiunto.
const fetchWithAuthorization = async (url, options = {}) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${profile.token}`,
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Errore durante la richiesta");
  }

  return response;
};

//Action per inviare un prejob
export const sendPrejobAction = (obj) => {
  return async (dispatch) => {
    fetchWithAuthorization(`${API}/savedPrejobs`, {
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
        //handleSuccessAlert(true);
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
    fetchWithAuthorization(`${API}/savedPrejobs`)
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
