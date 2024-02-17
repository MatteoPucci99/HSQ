import { TextField } from "@mui/material"
import { useRef, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import  SignatureCanvas  from "react-signature-canvas";



const Workers = (props)=>{

    // Inizializzo l'useRef per prendere la referenza del componente canvas
    const signatureRef = useRef(null);

    const [worker,setWorker] = useState(
    {
        name_surname: '',
        signature: ''
    })
    //Funzione per salvare la firma nello stato. Con onEnd al termine della scrittura si aggiorna lo stato
    const handleSave = () => {
        if (signatureRef.current) {
            const workerSignature = signatureRef.current.toDataURL();
            setWorker(prevState=>({
                ...prevState,
                signature: workerSignature
            }));
        }
    };
    //Funzione per pulire il canvas
    const handleClear = () => {
        if (signatureRef.current) {
          signatureRef.current.clear();
          setWorker(prevState=>({
            ...prevState,
            signature: ''
        }));
        }
      };
    //Funzione per verificare se il campo di testo e la firma sono stati compilati
    const isValidData = ()=>{
        for(const key in worker){
            if(worker[key].trim() === ''){
                return (false, alert('Compila tutti i campi richiesti'))
            } 
        }
        return true
    }      
    //Salvo nel oggetto preJob tutte le informazioni raccolte durante la compilazione
    const handleWorkers = ()=>{
        if(isValidData()){
            props.handleWorkers(worker)
            setWorker(prevState=>({
                ...prevState,
                name_surname:'',
                signature:''
            }))
            signatureRef.current.clear()
        }
    }

    return (
        <>
            <Row className="mt-5 row-cols-1">
                <h2 className="text-center mb-5">Presenze lavoratori</h2>
                <Col className="text-center">
                    <TextField label="Nome e cognome" name="workers" variant="outlined" value={worker.name_surname} onChange={(e)=>{setWorker(prevState=>({...prevState,   name_surname: e.target.value}))}} className="inputWidth"/>
                </Col>
                <Col className="border p-2 text-center mt-4">
                    <SignatureCanvas penColor='black' canvasProps={{ height: 200, className: 'myCanvas'}} ref={signatureRef} onEnd={handleSave}/>
                    <Button onClick={handleClear} variant="outline-danger">Cancella</Button>                 
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <Button variant="success" onClick={handleWorkers}>Salva dati</Button>
                </Col>
            </Row>
        </>
  
           
        
    )
}

export default Workers