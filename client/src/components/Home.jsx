import { Link } from "react-router-dom"
import { Col, Container, Row} from 'react-bootstrap'
import logo from "../imgs/logo.png"


const Home = ()=>{

    return (
        
        <Container className="d-flex flex-column align-items-center">
            <Row className="mt-5">
                <Col>
                    <img src={logo} alt="logo" width={350} />
                </Col>
            </Row>
            <Row className="row-cols-1 mt-4">
                <Col className="mt-3">
                    <Link to="/prejobs" style={{textDecoration:'none', color:'white'}} >
                        <div className="cards d-flex align-items-center justify-content-center">
                            Prejob Check
                        </div>
                    </Link>                    
                </Col>
                <Col className="mt-3">
                    <Link to="/prejobs" style={{textDecoration:'none', color:'white'}}>
                        <div className="cards d-flex align-items-center justify-content-center">
                            Dashboard
                        </div>
                    </Link>                    
                </Col>
            </Row>
        </Container>
       
        
    )
}

export default Home