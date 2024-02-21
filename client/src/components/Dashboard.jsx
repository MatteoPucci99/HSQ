import { useSelector } from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import { format} from 'date-fns';
import itLocale from 'date-fns/locale/it';
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {  PDFDownloadLink } from '@react-pdf/renderer';
import PdfContent from "./Pdf/PrejobPdf";


const Dashboard = ()=>{
    const navigate = useNavigate()
    const prejobs = useSelector(state=>state.prejob.content)
    //Funzione per formattare data nel modo specificato
    const formatSingleDate = (dateString) => {
        const formattedDate = format(new Date(dateString), "dd MMMM yyyy 'alle ore' HH:mm",{ locale: itLocale });
        return formattedDate;
    };
    //Ritorno lo stesso array ma con le date modificate
    const formattedPrejobsWithDate = prejobs.map(el=>({
        ...el,
        time: formatSingleDate(el.time)
    }))
    
    //Impostazioe delle colonne e delle righe per la Grid 
    const rows = formattedPrejobsWithDate
    const columns = [
        { field: 'company', headerName: 'Impresa', width: 130 },
        { field: 'inCharge', headerName: 'Preposto', width: 130 },
        { field: 'site', headerName: 'Cantiere', width: 130 },
        { field: 'time', headerName: 'Data e ora', width: 300 },
        {
            field: 'downloadPdf',
            headerName: 'Download PDF',
            width: 150,
            renderCell: (params) => {
                const prejobData = params.row;
                return (
                    <PDFDownloadLink
                        document={<PdfContent prejobData={prejobData} />}
                        fileName={`prejob_${prejobData._id}.pdf`}
                    >
                        {({ loading }) => (loading ? 'Caricamento...' : 'Download')}
                    </PDFDownloadLink>
                );
            },
        },
    ];
    const getRowId = (row) => row._id;
    
    //const createPdf = ()=>(
    //    <PdfContent prejobData={formattedPrejobsWithDate}/>
    //)

    return (
     <Container fluid className="text-center">    
        <Row className="row-cols-1" style={{ height: 400 }}>
            <Col className="titleContainer d-flex align-items-center justify-content-center">
                <h1 className="title"><span style={{color:'#027d75ff'}}>Admin</span> Dashboard</h1>
            </Col>
            <Col className="mt-4">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Col>
            <Col className="mt-4 text-end">
                <Button variant="contained" onClick={()=>navigate('/')} color="primary">Home</Button>
            </Col>
            <Col>
            {/* <div>
                <PDFDownloadLink document={createPdf()} fileName="somename.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                  }
                </PDFDownloadLink>
            </div> */}
            </Col>
        </Row>
     </Container>   
    )
}

export default Dashboard