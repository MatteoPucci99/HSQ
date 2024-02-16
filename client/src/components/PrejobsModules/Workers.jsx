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

    const handleSave = () => {
        if (signatureRef.current) {
            const workerSignature = signatureRef.current.toDataURL();
            setWorker(prevState=>({
                ...prevState,
                signature: workerSignature
            }));
        }
    };
    const handleClear = () => {
        if (signatureRef.current) {
          signatureRef.current.clear();
          setWorker(prevState=>({
            ...prevState,
            signature: ''
        }));
        }
      };

    const handleWorkers = ()=>{
        props.handleWorkers(worker)
        setWorker(prevState=>({
            ...prevState,
            name_surname:'',
            signature:''
        }))
        signatureRef.current.clear()
    }

    return (
        <>
            <Row className="mt-5">
                <h2 className="text-center mb-5">Presenze lavoratori</h2>
                <Col className="text-center">
                    <TextField label="Nome lavoratore" name="workers" variant="outlined" value={worker.name_surname} onChange={(e)=>{setWorker(prevState=>({...prevState,   name_surname: e.target.value}))}} className="inputWidth"/>
                </Col>
                <Col className="border p-2">
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