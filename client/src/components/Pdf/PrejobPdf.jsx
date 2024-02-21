import {  Document, Page, Text} from '@react-pdf/renderer';
import prejobsQuestions from '../../content/preJobs/prejobs';

const PdfContent = (props)=>(
    <Document>
        <Page>
            <Text>
                {props.prejobData.inCharge}
            </Text>
        </Page>
    </Document> 
)

export default PdfContent