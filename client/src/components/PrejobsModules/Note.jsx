import { TextField } from "@mui/material"
import { Col, Row } from "react-bootstrap"


const Note = (props)=>{

    const handleInputChange = (e) => {
        //Destrutturazione per estrarre nome e valore del campo input
        const { name, value } = e.target;
        //Funzione passata come prop da Prejobs per gestire il suo stato
        props.updateNote(name, value);
    };

    return (
    <Row>
        <Col className="mt-4 text-center">
            <Row>
                <Col>
                    <h1 className="mb-3">Note</h1>
                    <span>
                     Indicare le eventuali segnalazioni, criticità, anomalie evidenziate dai lavoratori durante la compilazione del presente Pre-Job Check
                    </span>
                </Col>
            </Row>
            <TextField
                        className="inputWidth mt-5"
                        name="note" value={props.note} onChange={handleInputChange}
                        label="Note attività"
                        placeholder="Digitare..."
                        multiline
                        rows={6}
                    />
        </Col>
    </Row>
    )
}

export default Note