import { Link } from "react-router-dom"
import {Button, Col, Container, Row} from 'react-bootstrap'


const Home = ()=>{
    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="mt-4 display-4">HSQ-APP-TEST</h1>
            <Row className="row-cols-1 text-center w-50">
                <Col className="mt-3">
                    <Link to="/prejobs" >
                        <Button className="w-75">
                            Prejob Check
                        </Button>
                    </Link>                    
                </Col>
                <Col className="mt-3">
                    <Link to="/prejobs" >
                        <Button className="w-75">
                            Check Preposti
                        </Button>
                    </Link>                    
                </Col>
                <Col className="mt-3">
                    <Link to="/prejobs" >
                        <Button className="w-75">
                            Check Mezzi
                        </Button>
                    </Link>                    
                </Col>
                <Col className="mt-3">
                    <Link to="/prejobs" >
                        <Button className="w-75">
                            Registro Informazioni
                        </Button>
                    </Link>                    
                </Col>
                <Col className="mt-3">
                    <Link to="/prejobs" >
                        <Button className="w-75">
                            Dashboard
                        </Button>
                    </Link>                    
                </Col>

            </Row>

        </Container>
        
    )
}

export default Home