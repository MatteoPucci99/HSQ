import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../imgs/logo.png";
import { signInAction, signUpAction } from "../../redux/actions/auth";
import AlertWarning from "../Alert/AlertWarning";

const Auth = () => {
  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialUser);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassowrd, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassowrd);

  const [showWarning, setShowWarning] = useState(false);
  const showAlert = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 1500);
  };

  const switchMode = () => {
    setUser(initialUser);
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  const signInCase = user.email.trim() === "" || user.password.trim() === "";

  const isValidData = () => {
    if (!isSignup) {
      if (signInCase) {
        showAlert();
        return false;
      }
      return true;
    } else {
      for (const key in user) {
        if (user[key].trim() === "") {
          showAlert();
          return false;
        }
      }
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidData()) {
      if (isSignup) {
        dispatch(signUpAction(user, navigate));
      } else {
        dispatch(signInAction(user, navigate));
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Row className="mt-5">
        <Col>
          <img src={logo} alt="logo" width={350} />
        </Col>
      </Row>
      <Row className="row-cols-1 loginWidth loginContainer mt-4 py-3 px-1">
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <Col className="d-flex">
              <TextField
                label="Nome"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                variant="outlined"
                className="loginInput inputWidth me-3"
              />
              <TextField
                label="Cognome"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                variant="outlined"
                className="loginInput inputWidth"
              />
            </Col>
          )}
          <Col className="mt-3">
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              variant="outlined"
              className="loginInput"
              style={{ width: "100%" }}
            />
          </Col>
          <Col className="mt-3">
            <TextField
              label="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              variant="outlined"
              className="loginInput"
              style={{ width: "100%" }}
            />
          </Col>
          {isSignup && (
            <Col className="mt-3">
              <TextField
                label="Conferma password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
                variant="outlined"
                className="loginInput"
                style={{ width: "100%" }}
              />
            </Col>
          )}
          <Col className="d-flex justify-content-end mt-3">
            <Button variant="contained" type="submit">
              {isSignup ? "Registrati" : "Accedi"}
            </Button>
          </Col>
        </form>
        {showWarning && (
          <Col className="alert">
            <AlertWarning text={"Compila tutti i campi richiesti !"} />
          </Col>
        )}
      </Row>
      <Row className="mt-3 fw-bold">
        <Button onClick={switchMode}>
          {isSignup
            ? "Hai già un account? Fai il Log in"
            : "Non hai un account? Registrati"}
        </Button>
      </Row>
    </Container>
  );
};

export default Auth;
