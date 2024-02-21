import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Prejobs from "./components/Prejobs";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPrejobAction } from "./redux/actions/prejob";
import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import Footer from "./components/Prova";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrejobAction());
  }, []);
  //Tema colori per i buttons di materialUI
  const theme = createTheme({
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
    <BrowserRouter>
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
          <Route path="/" element={<Home />} />
          <Route path="/prejobs" element={<Prejobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prova" element={<Footer />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
