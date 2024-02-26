import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const InCharge = (props) => {
  const [mySignature, setMySignature] = useState(null);
  // Inizializzo l'useRef per prendere la referenza del componente canvas
  const signatureRef = useRef(null);

  const handleInputChange = (e) => {
    // Destrutturazione per estrarre nome e valore del campo input
    const { name, value } = e.target;
    // Funzione passata come prop da Prejobs per gestire il suo stato
    props.updateInCharge(name, value);
  };

  //Salvo la firma
  const handleSave = () => {
    if (signatureRef.current) {
      const signature = signatureRef.current.toDataURL();
      setMySignature(signature);
      props.updateSignature(signature);
    }
  };

  //Pulisco il canvas e resetto lo stato
  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setMySignature(null);
    }
  };

  return (
    <Row className="row-cols-1">
      <Col className="px-4">
        <p className="text-secondary fst-italic mt-3">
          {`Il Preposto Lavori "${props.company}" ha compilato la presente check list, illustrato i rischi di ambiente, i rischi connessi all’attività, gli eventuali rischi interferenziali, e le misure, compresi i DPI/DPC, per eliminare o ridurre al minimo i rischi correlati all’esecuzione del lavoro contenuti nel Permesso di Lavoro e in tutta la documentazione di Safety attinente il presente lavoro. I rischi propri delle diverse fasi del Lavoro e le misure necessarie per una corretta esecuzione in sicurezza dello stesso sono stati compresi dai lavoratori. I lavoratori sono stati informati che ogni eventuale variazione delle condizioni di lavoro deve essere immediatamente segnalata affinché il Permesso di Lavoro venga riverificato ed eventualmente riemesso.`}
        </p>
      </Col>
      <Col className="text-center">
        <TextField
          label="Nome e cognome preposto"
          name="inCharge"
          value={props.inCharge}
          onChange={handleInputChange}
          variant="outlined"
          className="inputWidth"
        />
        <Row className="p-3">
          <h3>Inserisci la firma</h3>
          <Col className="border p-2">
            <SignatureCanvas
              penColor="black"
              canvasProps={{ height: 350, className: "myCanvas" }}
              ref={signatureRef}
              onEnd={handleSave}
            />
            <Button onClick={handleClear} variant="contained" color="error">
              Cancella
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default InCharge;
