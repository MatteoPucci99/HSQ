import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
//dateFns
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";

import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PdfContent from "./Pdf/PrejobPdf";

const Dashboard = () => {
  const navigate = useNavigate();
  const prejobs = useSelector((state) => state.prejob.content);
  //Funzione per formattare data nel modo specificato
  const formatSingleDate = (dateString) => {
    const formattedDate = format(
      new Date(dateString),
      "dd MMMM yyyy 'alle ore' HH:mm",
      { locale: itLocale }
    );
    return formattedDate;
  };
  //Ritorno lo stesso array ma con le date modificate
  const formattedPrejobsWithDate = prejobs.map((el) => ({
    ...el,
    time: formatSingleDate(el.time),
  }));

  //Impostazioe delle colonne e delle righe per la Grid. Passo al PdfContent i contenuti della singola cella
  const rows = formattedPrejobsWithDate;
  const columns = [
    { field: "company", headerName: "Impresa", width: 200 },
    { field: "inCharge", headerName: "Preposto", width: 150 },
    { field: "site", headerName: "Cantiere", width: 200 },
    { field: "time", headerName: "Data e ora", width: 250 },
    {
      field: "downloadPdf",
      headerName: "PDF",
      width: 150,
      renderCell: (params) => {
        const prejobData = params.row;
        return (
          <Button
            variant="contained"
            color="primary"
            type="button"
            className="pdfContainer p-1"
          >
            <PDFDownloadLink
              document={<PdfContent prejobData={prejobData} />}
              fileName={`prejob_${prejobData._id}.pdf`}
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {({ loading }) => (loading ? "..." : <DownloadIcon />)}
            </PDFDownloadLink>
          </Button>
        );
      },
    },
  ];
  const getRowId = (row) => row._id;

  return (
    <Container fluid className="text-center">
      <Row className="row-cols-1" style={{ height: 400 }}>
        <Col className="titleContainer d-flex align-items-center justify-content-center">
          <h1 className="title">
            <span style={{ color: "#027d75ff" }}>Admin</span> Dashboard
          </h1>
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
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            sx={{
              "& .MuiTablePagination-selectLabel": {
                marginBottom: "0px",
                display: "block !important",
              },
              "& .MuiTablePagination-displayedRows": {
                marginBottom: "0px",
              },
              "& .MuiInputBase-root.MuiInputBase-colorPrimary.MuiTablePagination-input":
                {
                  display: "flex !important",
                },
            }}
            disableRowSelectionOnClick
          />
        </Col>
        <Col className="mt-4 text-end">
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            color="primary"
          >
            Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
