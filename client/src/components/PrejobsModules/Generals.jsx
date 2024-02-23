import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Col, Row } from "react-bootstrap";

const Generals = (props) => {
  const handleInputChange = (e) => {
    //Destrutturazione per estrarre nome e valore del campo input
    const { name, value } = e.target;
    //Funzione passata come prop da Prejobs per gestire il suo stato
    props.handleGeneral(name, value);
  };
  //DateTimePicker non restituisce un oggetto "e", perciò non possiamo usare la destrutturazione name , value
  const handleDateTimeChange = (newValue) => {
    props.handleGeneral("time", newValue);
  };

  return (
    <Row className="row-cols-1">
      <Col className="mt-4 text-center">
        <TextField
          label="Nome impresa"
          name="company"
          value={props.company}
          onChange={handleInputChange}
          variant="outlined"
          className="inputWidth"
        />
      </Col>
      <Col className="mt-4 text-center">
        <TextField
          label="Nome cantiere"
          name="site"
          value={props.site}
          onChange={handleInputChange}
          variant="outlined"
          className="inputWidth"
        />
      </Col>
      <Col className="mt-4 text-center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            className="inputWidth"
            name="time"
            value={props.time}
            onChange={handleDateTimeChange}
          />
        </LocalizationProvider>
      </Col>
      <Col className="mt-4 text-center">
        <TextField
          className="inputWidth"
          name="info"
          value={props.info}
          onChange={handleInputChange}
          label="Descrizione attività"
          placeholder="Digitare..."
          multiline
        />
      </Col>
    </Row>
  );
};

export default Generals;
