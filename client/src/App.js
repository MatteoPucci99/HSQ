import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { itIT } from "@mui/material/locale";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Prejobs from "./components/Prejobs";
import { getPrejobAction } from "./redux/actions/prejob";
function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRequired = location.pathname !== "/";
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  useEffect(() => {
    if (isAuthRequired && (!user || !user.token)) {
      navigate("/");
      localStorage.clear();
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getPrejobAction());
  }, [user]);

  //Tema colori per i buttons di materialUI
  const theme = createTheme(itIT, {
    palette: {
      primary: {
        main: "#027d75ff",
      },
      secondary: {
        main: "#ff4081",
      },
      focus: {
        main: "#027d75ff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: theme.palette.focus.main,
            },
        }}
      />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/prejobs" element={<Prejobs />} />
        {user?.result.role === "admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
