import { Col, Container, Row } from "react-bootstrap";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPrejob = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center" style={{ height: "80vh" }}>
      <Row className="row-cols-1">
        <Col className="text-center">
          <CheckCircleOutlineIcon color="primary" style={{ fontSize: "8em" }} />
        </Col>
        <Col className="text-center fs-1 mt-3">
          Prejob check compilato con successo !
        </Col>
        <Col className="text-center mt-3">
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/home")}
          >
            Chiudi
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessPrejob;
