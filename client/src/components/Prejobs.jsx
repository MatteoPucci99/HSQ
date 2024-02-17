import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import PrejobsQuestions from "./PrejobsModules/PrejobsQuestions"
import Generals from "./PrejobsModules/Generals"
import InCharge from "./PrejobsModules/InCharge"
import Note from "./PrejobsModules/Note"
import Workers from "./PrejobsModules/Workers"


const Prejobs = ()=>{

    //Gestire numOfGroup in base alle pagine di visualizzazione
    const numOfGroup = 5
    //Stato per gestire la visualizzazione delle pagine
    const [currentGroup, setCurrentGroup] = useState(1)
    //Oggetto preJob da inviare al server
    const [preJob, setCurrentPreJob] = useState({
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
    })

    //Funzione per gestire i gruppi di input successivi
    const nextGroup = ()=>{
        if(currentGroup <= numOfGroup && isCompiled()){
            setCurrentGroup(currentGroup+1)
        }
    }
    //Funzione per gestire i gruppi di input precedenti
    const previousGroup = ()=>{
        if(currentGroup>0){
            setCurrentGroup(currentGroup-1)
        }
    }
    // Casi utilizzati nella funzione di verifica dei campi input
    const cases = [
        { condition: currentGroup === 1, fields: ['company', 'site', 'time','info'] },
        { condition: currentGroup === 2, fields: ['safety', 'activities', 'env', 'method', 'dpiDpcCheck'] },
        { condition: currentGroup === 3, fields: ['note'] },
        { condition: currentGroup === 4, fields: ['inCharge', 'signature'] },
        { condition: currentGroup === 5, fields: ['workers'] }
    ]
    //Funzione per verificare che tutti i campi input siano compilati a dovere
    const isCompiled = () => {
        //Se tutte le condizioni sono soddisfatte some tornerà false e con ! diventerà true. 
        return !cases.some(({ condition, fields }) => {
          if (condition) {
            return fields.some(field => {
                //Se è un array verifico che la lunghezza sia === 0
                if (Array.isArray(preJob[field])) {
                  return preJob[field].length === 0;
                //Se è un oggetto verifico che almeno una delle proprietà sia stringa vuota
                //Con Object.values trasformo l'oggetot in un array e lo itero con some per la verifica della stringa vuota
                } else if (typeof preJob[field] === 'object') {
                  return Object.values(preJob[field]).some(value => value === '');
                } else {
                //Se non è niente dei precedenti verifico che la proprietà sia una stringa vuota
                  return preJob[field] === '';
                }
            });
          }
          return false
        });
      };
    
    //Funzione per gestire gli input nei vari componenti
    const handleInput = (category, value) => {
        setCurrentPreJob(prevState => ({
            ...prevState,
            [category]: value
        }));
    };
    
    //Funzione per gestire salvataggio della firma
    const handleSignature = (input)=>{
        setCurrentPreJob(prevState => ({
            ...prevState,
            signature: input
        }));
    }
    //Funzione da passare a Workers come prop per gestire il salvataggio di ciascun oggetto lavoratore nello stato preJob
    const handleWorkers = (worker)=>{
        setCurrentPreJob(prevState=>({
            ...prevState,
            workers: [...prevState.workers, worker]
        }))
    }
    
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
        <PrejobsQuestions preJob={preJob} updatePrejob={handleInput} />,
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
    const currentComponent = components[currentGroup - 1]
 
    return (
       <Container>
            <Row className="row-cols-1">
                <h1 className="text-center display-3 mt-5" id="redirect">Pre-Job-Check</h1>
                <form>
                    <Col>
                        {currentComponent}
                    </Col>
                    
                    <div className="d-flex justify-content-end mt-4 mb-5">
                    <Button disabled={currentGroup === 1} className="me-4" onClick={previousGroup}>Indietro</Button>
                    <Button disabled={currentGroup === numOfGroup} onClick={nextGroup}>Avanti</Button>
                    </div>
                </form>
            </Row>

            
       </Container>
    )
}

export default Prejobs