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
    <Row className="row-cols-1">
        <Col className="mt-4">           
            <h1 className="mb-3 text-center">Note</h1>
            
            <span className="fst-italic">
                Indicare le eventuali segnalazioni, criticità, anomalie evidenziate dai lavoratori durante la compilazione del presente Pre-Job Check
            </span>          
        </Col>
        <Col className="text-center">
            <TextField
                        className="inputWidth mt-4"
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