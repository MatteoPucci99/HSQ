//MUI & Bootstrap
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
//Redux & router
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Logo
import logo from "../../imgs/logo2.png";
//Action
import { signInAction, signUpAction } from "../../redux/actions/auth";
//Alert
import AlertWarning from "../Alert/AlertWarning";

const Auth = () => {
  //Inizializzazione stato utente
  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };
  const [user, setUser] = useState(initialUser);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Gestione visualizazione password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  //Gestione alertWarning
  const [showWarning, setShowWarning] = useState(false);
  const showAlert = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 1500);
  };

  //Switch da signUp a singIN
  const switchMode = () => {
    setUser(initialUser);
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  //Validazione input
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

  //Gestione form
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

  //Gestione input
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
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              variant="outlined"
              className="loginInput"
              style={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Col>
          {isSignup && (
            <Col className="mt-3">
              <TextField
                type={showPassword ? "text" : "password"}
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
      <Row className="mt-5 fw-bold">
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
