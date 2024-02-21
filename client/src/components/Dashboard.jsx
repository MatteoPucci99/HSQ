import { useSelector } from "react-redux"
import { DataGrid } from '@mui/x-data-grid';
import { format} from 'date-fns';
import itLocale from 'date-fns/locale/it';
import { Col, Container, Row } from "react-bootstrap";
import { Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Dashboard = ()=>{
    const navigate = useNavigate()
    const prejobs = useSelector(state=>state.prejob.content)
    const formatSingleDate = (dateString) => {
        const formattedDate = format(new Date(dateString), "dd MMMM yyyy 'alle ore' HH:mm",{ locale: itLocale });
        return formattedDate;
    };
   const formattedPrejobsWithDate = prejobs.map(el=>({
    ...el,
    time: formatSingleDate(el.time)
   }))


    const columns = [
        { field: 'company', headerName: 'Impresa', width: 130 },
        { field: 'inCharge', headerName: 'Preposto', width: 130 },
        { field: 'site', headerName: 'Cantiere', width: 130 },
        { field: 'time', headerName: 'Data e ora', width: 300 },
    ]
    const rows = formattedPrejobsWithDate
    const getRowId = (row) => row._id;
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
            <Col>
                <Button variant="contained" onClick={()=>navigate('/')} color="primary">Home</Button>
            </Col>
        </Row>
     </Container>   
    )
}

export default Dashboard