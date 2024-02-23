import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const Workers = (props) => {
  // Inizializzo l'useRef per prendere la referenza del componente canvas
  const signatureRef = useRef(null);

  const [worker, setWorker] = useState({
    name_surname: "",
    signature: "",
  });
  //Funzione per salvare la firma nello stato. Con onEnd al termine della scrittura si aggiorna lo stato
  const handleSave = () => {
    if (signatureRef.current) {
      const workerSignature = signatureRef.current.toDataURL();
      setWorker((prevState) => ({
        ...prevState,
        signature: workerSignature,
      }));
    }
  };
  //Funzione per pulire il canvas
  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setWorker((prevState) => ({
        ...prevState,
        signature: "",
      }));
    }
  };
  //Funzione per verificare se il campo di testo e la firma sono stati compilati
  const isValidData = () => {
    for (const key in worker) {
      if (worker[key].trim() === "") {
        return false, alert("Compila tutti i campi richiesti");
      }
    }
    return true;
  };
  //Salvo nel oggetto preJob tutte le informazioni raccolte durante la compilazione
  const handleWorkers = () => {
    if (isValidData()) {
      props.handleWorkers(worker);
      setWorker((prevState) => ({
        ...prevState,
        name_surname: "",
        signature: "",
      }));
      signatureRef.current.clear();
    }
  };

  return (
    <Container>
      <Row className="mt-5 row-cols-1 mb-5">
        <h1 className="text-center mb-5">Presenze lavoratori</h1>
        <Col className="text-center">
          <TextField
            label="Nome e cognome"
            name="workers"
            variant="outlined"
            value={worker.name_surname}
            onChange={(e) => {
              setWorker((prevState) => ({
                ...prevState,
                name_surname: e.target.value,
              }));
            }}
            className="inputWidth"
          />
        </Col>
        <h3 className="text-center mt-4">Inserisci la firma</h3>
        <Col className="border p-2 text-center">
          <SignatureCanvas
            penColor="black"
            canvasProps={{ height: 200, className: "myCanvas" }}
            ref={signatureRef}
            onEnd={handleSave}
          />
          <div className="d-flex justify-content-evenly justify-content-md-center mt-4">
            <Button
              onClick={handleClear}
              variant="contained"
              className="me-md-2"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Cancella
            </Button>
            <Button
              variant="contained"
              onClick={handleWorkers}
              endIcon={<CloudUploadIcon />}
            >
              Salva presenza
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Workers;
