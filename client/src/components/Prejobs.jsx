import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import prejobsQuestions from "../content/preJobs/prejobs";
//Action
import { sendPrejobAction } from "../redux/actions/prejob";
// Alert
import AlertSuccess from "./Alert/AlertSuccess";
import AlertWarning from "./Alert/AlertWarning";
//prejobsModules
import Generals from "./PrejobsModules/Generals";
import InCharge from "./PrejobsModules/InCharge";
import Note from "./PrejobsModules/Note";
import PrejobsQuestions from "./PrejobsModules/PrejobsQuestions";
import Workers from "./PrejobsModules/Workers";

const Prejobs = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShowSuccess = (input) => {
    setShowSuccess(input);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Stato di ciascun bottone per gestire lo switch da outline a contained.
  //buttonState sarà un array di array, in cui viene tenuto traccia dell'indice della categoria di domande e delle risposte a quella categoria di domanda
  const initialButtonState = Array.from(
    { length: prejobsQuestions.length },
    () => []
  );
  const [buttonState, setButtonState] = useState(initialButtonState);
  //Gestire numOfGroup in base alle pagine di visualizzazione
  const numOfGroup = 5;
  //Stato per gestire la visualizzazione delle pagine
  const [currentGroup, setCurrentGroup] = useState(1);
  //Oggetto preJob da inviare al server
  const initialPrejob = {
    company: "",
    site: "",
    time: new Date(),
    info: "",
    safety: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    },
    activities: {
      1: "",
      2: "",
      3: "",
      4: "",
    },
    env: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    },
    method: {
      1: "",
      2: "",
      3: "",
    },
    dpiDpcCheck: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
    },
    note: "",
    inCharge: "",
    signature: "",
    workers: [],
  };
  const [preJob, setCurrentPreJob] = useState(initialPrejob);
  //Funzione per gestire i gruppi di input successivi
  const nextGroup = () => {
    if (currentGroup === numOfGroup && isCompiled()) {
      dispatch(sendPrejobAction(preJob, handleShowSuccess));
      setCurrentPreJob(initialPrejob);
      setButtonState(initialButtonState);
      setTimeout(() => {
        setCurrentGroup(1);
      }, 3000);
      return;
    }
    if (currentGroup < numOfGroup && isCompiled()) {
      setCurrentGroup(currentGroup + 1);
    } else {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1500);
    }
  };
  //Funzione per gestire i gruppi di input precedenti
  const previousGroup = () => {
    if (currentGroup === 1) {
      navigate("/home");
    }
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };
  // Casi utilizzati nella funzione di verifica dei campi input
  const cases = [
    {
      condition: currentGroup === 1,
      fields: ["company", "site", "time", "info"],
    },
    {
      condition: currentGroup === 2,
      fields: ["safety", "activities", "env", "method", "dpiDpcCheck"],
    },
    { condition: currentGroup === 3, fields: ["note"] },
    { condition: currentGroup === 4, fields: ["inCharge", "signature"] },
    { condition: currentGroup === 5, fields: ["workers"] },
  ];
  //Funzione per verificare che tutti i campi input siano compilati a dovere
  const isCompiled = () => {
    //Se tutte le condizioni sono soddisfatte some tornerà false e con ! diventerà true.
    return !cases.some(({ condition, fields }) => {
      if (condition) {
        return fields.some((field) => {
          //Se è un array verifico che la lunghezza sia === 0
          if (Array.isArray(preJob[field])) {
            return preJob[field].length === 0;
            //Se è un oggetto verifico che almeno una delle proprietà sia stringa vuota
            //Con Object.values trasformo l'oggetot in un array e lo itero con some per la verifica della stringa vuota
          } else if (typeof preJob[field] === "object") {
            return Object.values(preJob[field]).some((value) => value === "");
          } else {
            //Se non è niente dei precedenti verifico che la proprietà sia una stringa vuota
            return preJob[field] === "";
          }
        });
      }
      return false;
    });
  };

  //Funzione per gestire gli input nei vari componenti
  const handleInput = (category, value) => {
    setCurrentPreJob((prevState) => ({
      ...prevState,
      [category]: value,
    }));
  };

  //Funzione per gestire salvataggio della firma
  const handleSignature = (input) => {
    setCurrentPreJob((prevState) => ({
      ...prevState,
      signature: input,
    }));
  };
  //Funzione da passare a Workers come prop per gestire il salvataggio di ciascun oggetto lavoratore nello stato preJob
  const handleWorkers = (worker) => {
    setCurrentPreJob((prevState) => ({
      ...prevState,
      workers: [...prevState.workers, worker],
    }));
  };
  //Funzione per gestire lo stato dei buttons: in base alla risposta data il button switcha da outlined a contained
  const handleButtonState = (categoryIndex, questionIndex, option) => {
    //Clono stato dei buttons
    const updateButtonState = [...buttonState];
    //Imposto lo stato del button su true e gli altri su false in base all'uguaglianza
    updateButtonState[categoryIndex][questionIndex] = {
      Si: option === "Si",
      No: option === "No",
      NA: option === "N.A.",
    };
    //Aggiorno lo stato
    setButtonState(updateButtonState);
  };

  //Array dei miei componenti
  const components = [
    <Generals
      company={preJob.company}
      site={preJob.site}
      date={preJob.date}
      time={preJob.time}
      info={preJob.info}
      handleGeneral={handleInput}
    />,
    <PrejobsQuestions
      preJob={preJob}
      updatePrejob={handleInput}
      updateButton={handleButtonState}
      buttonState={buttonState}
    />,
    <Note note={preJob.note} updateNote={handleInput} />,
    <InCharge
      company={preJob.company}
      inCharge={preJob.inCharge}
      signature={preJob.signature}
      updateInCharge={handleInput}
      updateSignature={handleSignature}
    />,
    <Workers handleWorkers={handleWorkers} />,
  ];

  //Componente da mostrare
  const currentComponent = components[currentGroup - 1];

  return (
    <Container fluid>
      <Row className="row-cols-1">
        <div className="d-flex justify-content-center align-items-center titleContainer">
          <h1 className="title">
            <span style={{ color: "#027d75ff" }}>Pre Job</span> Check
          </h1>
        </div>
        <div className="d-lg-flex justify-content-center">
          <form className="mt-4 prejobContainer">
            <Col>
              {currentComponent}
              <div className="d-flex justify-content-end mt-4 mb-5">
                <Button
                  className="me-4"
                  onClick={previousGroup}
                  variant="contained"
                  color="primary"
                >
                  Indietro
                </Button>
                <Button onClick={nextGroup} variant="contained" color="primary">
                  {currentGroup === numOfGroup ? "Fine" : "Avanti"}
                </Button>
              </div>
            </Col>
            {showWarning && (
              <Col className="alert">
                <AlertWarning text={"Compila tutti i campi richiesti !"} />
              </Col>
            )}
            {showSuccess && (
              <Col className="alert">
                <AlertSuccess text={"Pre Job inviato con successo!"} />
              </Col>
            )}
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default Prejobs;
