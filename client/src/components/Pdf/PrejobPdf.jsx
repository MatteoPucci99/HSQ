import {  StyleSheet, Document, Page, Text,Image} from '@react-pdf/renderer';
import prejobsQuestions from '../../content/preJobs/prejobs';
import { Col, Row } from 'react-bootstrap';

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center', 
      marginBottom: 18    
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: { 
      fontSize: 24,
      fontWeight:'bold',
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
    },
    answer: {
        marginTop: 0,
        marginBottom:12,
        marginLeft: 12,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'justify',
      },
    image: {
      width: 300,
      marginVertical: 15,
      marginHorizontal: 100,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
 

const PdfContent = (props)=>{

    return(
    <Document>        
        <Page style={styles.body}>
          <Text style={styles.title}>Riepilogo Pre-Job-Check</Text>
          <Text style={styles.text}>Preposto : {props.prejobData.inCharge} di {props.prejobData.company}</Text>
          <Text style={styles.answer}>Cantiere : {props.prejobData.site}</Text>
          <Text style={styles.answer}>Team composto da: {props.prejobData.workers.map(worker=>worker.name_surname).join(', ')}</Text>
          <Text style={styles.subtitle}>
            Descrizione attività:
          </Text>
          <Text style={styles.text}>
            {props.prejobData.info}
          </Text>
          <Text style={styles.subtitle}>ß
            Documentazione safety
          </Text>        
            {props.prejobData.safety && Object.keys(props.prejobData.safety).map((key, index) => (
                <Row key={key} className='row-cols-1'>
                  <Text style={styles.text}>{prejobsQuestions[0].questions[index].question}</Text>
                  <Text style={styles.answer}>{props.prejobData.safety[key]}</Text>
                </Row>               
            ))}
            <Text style={styles.subtitle}>
                Organizzazione attività
            </Text>  
             {props.prejobData.safety && Object.keys(props.prejobData.activities).map((key, index) => (
                <Row key={key} className='row-cols-1'>
                  <Text style={styles.text}>{prejobsQuestions[1].questions[index].question}</Text>
                  <Text style={styles.answer}>{props.prejobData.activities[key]}</Text>
                </Row>               
            ))}
            <Text style={styles.subtitle}>
                Ambiente di lavoro, interferenze, ordine e pulizia
            </Text>  
             {props.prejobData.safety && Object.keys(props.prejobData.env).map((key, index) => (
                <Row key={key} className='row-cols-1'>
                  <Text style={styles.text}>{prejobsQuestions[2].questions[index].question}</Text>
                  <Text style={styles.answer}>{props.prejobData.env[key]}</Text>
                </Row>               
            ))}
            <Text style={styles.subtitle}>
                Metodologie di lavoro
            </Text>
             {props.prejobData.safety && Object.keys(props.prejobData.method).map((key, index) => (
                <Row key={key} className='row-cols-1'>
                  <Text style={styles.text}>{prejobsQuestions[3].questions[index].question}</Text>
                  <Text style={styles.answer}>{props.prejobData.method[key]}</Text>
                </Row>               
            ))}
            <Text style={styles.subtitle}>
                Verifica DPI/DPC ed attrezzature
            </Text>
             {props.prejobData.safety && Object.keys(props.prejobData.dpiDpcCheck).map((key, index) => (
                <Row key={key} className='row-cols-1'>
                  <Text style={styles.text}>{prejobsQuestions[4].questions[index].question}</Text>
                  <Text style={styles.answer}>{props.prejobData.dpiDpcCheck[key]}</Text>
                </Row>               
            ))}
            <Text style={styles.subtitle}>
                Firma del preposto
            </Text>
            <Image
                style={styles.image}
                src={props.prejobData.signature}
            />
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
    </Document> 
    )
}

export default PdfContent