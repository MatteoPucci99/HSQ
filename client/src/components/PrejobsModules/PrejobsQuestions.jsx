import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import prejobsQuestions from "../../content/preJobs/prejobs";

const Prejobs = (props) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  //Funzione per gestire lo stato preJob di Prejobs
  const handleAnswerSelection = (category, questionIndex, answer, option) => {
    //Creo una copia delle varie "risposte" degli oggetti in base alla categoria
    const updatedAnswers = { ...props.preJob[category] };
    // Aggiorna la risposta per la domanda specifica
    updatedAnswers[questionIndex + 1] = answer; // Aggiungi 1 perché l'indice del ciclo parte da 0 e deve corrispondere alle chiavi degli oggetti
    // Utilizza la funzione di aggiornamento dello stato passata da Prejobs per aggiornare lo stato
    props.updatePrejob(category, updatedAnswers);
    props.updateButton(currentCategoryIndex, questionIndex, option);
  };

  //In base alla categoria che è all'interno del map faccio una verifica su "prejobsQuestions[currentCategoryIndex].description}"
  // e passo a handleAnswerSelection la categoria corretta da inserire per aggiornare lo stato di Prejob con la risposta data.
  const questionType = (input, questionIndex, answer, option) => {
    if (input === "Documentazione safety") {
      handleAnswerSelection("safety", questionIndex, answer, option);
    } else if (input === "Organizzazione attività") {
      handleAnswerSelection("activities", questionIndex, answer, option);
    } else if (input === "Ambiente di lavoro, interferenze, ordine e pulizia") {
      handleAnswerSelection("env", questionIndex, answer, option);
    } else if (input === "Metodologie di lavoro") {
      handleAnswerSelection("method", questionIndex, answer, option);
    } else if (input === "Verifica DPI/DPC ed attrezzature") {
      handleAnswerSelection("dpiDpcCheck", questionIndex, answer, option);
    }
  };

  //Funzione per gestire l'apparizione dei blocchi di domande successivi
  const handlePrevCategory = () => {
    setCurrentCategoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  //Funzione per gestire l'apparizione dei blocchi di domande precedenti
  const handleNextCategory = () => {
    setCurrentCategoryIndex((prevIndex) =>
      prevIndex < prejobsQuestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  //Funzione per gestire lo scroll al top della pagina quando si premono le frecce di scorrimento delle domande
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {prejobsQuestions[currentCategoryIndex] && (
        <Container fluid>
          <h1 className="mb-5 mt-4 text-center">
            {prejobsQuestions[currentCategoryIndex].description}
          </h1>
          {prejobsQuestions[currentCategoryIndex].questions.map(
            (question, qIndex) => (
              <Row key={qIndex} className="mt-5 py-4 mx-1 questions">
                <Col xs={12} key={`${qIndex}-a`}>
                  <p className="fw-bold text-md-center">{question.question}</p>
                </Col>
                <Col className="ms-3" key={`${qIndex}-b`}>
                  <Row className="w-100 h-100" key={`${qIndex}-c`}>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      key={`${qIndex}-d`}
                    >
                      <Button
                        variant={
                          props.buttonState[currentCategoryIndex][qIndex]?.Si
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() =>
                          questionType(
                            prejobsQuestions[currentCategoryIndex].description,
                            qIndex,
                            "Si",
                            "Si"
                          )
                        }
                      >
                        Si
                      </Button>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      key={`${qIndex}-e`}
                    >
                      <Button
                        variant={
                          props.buttonState[currentCategoryIndex][qIndex]?.No
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() =>
                          questionType(
                            prejobsQuestions[currentCategoryIndex].description,
                            qIndex,
                            "No",
                            "No"
                          )
                        }
                      >
                        No
                      </Button>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      key={`${qIndex}-f`}
                    >
                      <Button
                        variant={
                          props.buttonState[currentCategoryIndex][qIndex]?.NA
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() =>
                          questionType(
                            prejobsQuestions[currentCategoryIndex].description,
                            qIndex,
                            "N.A.",
                            "N.A."
                          )
                        }
                      >
                        N.A.
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          )}
        </Container>
      )}
      <div className="text-center mt-4">
        {currentCategoryIndex > 0 && (
          <TfiArrowCircleLeft
            className="me-3"
            style={{ fontSize: "2em", cursor: "pointer" }}
            onClick={() => {
              handleScroll();
              handlePrevCategory();
            }}
            href="#redirect"
          />
        )}
        {currentCategoryIndex < prejobsQuestions.length - 1 && (
          <TfiArrowCircleRight
            style={{ fontSize: "2em", cursor: "pointer" }}
            onClick={() => {
              handleScroll();
              handleNextCategory();
            }}
          />
        )}
      </div>
    </>
  );
};

export default Prejobs;
