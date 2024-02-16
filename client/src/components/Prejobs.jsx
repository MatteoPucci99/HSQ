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
    const case1 = currentGroup === 1 && (preJob.company === "" || preJob.site === "" || preJob.time === "")
    const case2 = currentGroup === 2 && (Object.values(preJob.safety).some(value=>value==="") || Object.values(preJob.activities).some(value=>value==="") || Object.values(preJob.env).some(value=>value==="") || Object.values(preJob.method).some(value=>value==="") || Object.values(preJob.dpiDpcCheck).some(value=>value===""))
    const case3 = currentGroup === 3 && preJob.note === ""
    //Funzione per verificare che tutti i campi input siano compilati a dovere
    const isCompiled = ()=>{
       /* if(case1){return false}
        if(case2){return false}
        if(case3){return false}*/
        return true
    }

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

 
    return (
       <Container>
            <Row className="row-cols-1">
                <h1 className="text-center display-3 mt-5" id="redirect">Pre-Job-Check</h1>
                <form>
                    {currentGroup === 1 && (
                    <Col>
                        <Generals 
                        company={preJob.company}
                        site={preJob.site}
                        date={preJob.date}
                        time={preJob.time}
                        info={preJob.info}
                        handleGeneral={handleInput}/>
                    </Col>)}
                    {currentGroup === 2 && (
                    <Col>
                        <PrejobsQuestions preJob={preJob} updatePrejob={handleInput}/>
                    </Col>)}
                    {currentGroup === 3 && (
                    <Col>
                         <Note note={preJob.note} updateNote={handleInput}/>
                    </Col>)}
                    {currentGroup === 4 && (
                    <Col>
                        <InCharge company={preJob.company} inCharge={preJob.inCharge} signature={preJob.signature} updateInCharge={handleInput} updateSignature={handleSignature}/>
                    </Col>)}
                    <Col>
                        {currentGroup === 5 && (
                            <Workers handleWorkers={handleWorkers}/>
                        )}
                    </Col>
                    
                    <div className="d-flex justify-content-end mt-4 mb-5">
                        {currentGroup > 1 && (
                            <Button className="me-4" onClick={previousGroup}>Indietro</Button>
                        )}
                        {currentGroup < numOfGroup && (
                            <Button onClick={nextGroup}>Avanti</Button>
                        )}
                    </div>
                </form>
            </Row>

            
       </Container>
    )
}

export default Prejobs