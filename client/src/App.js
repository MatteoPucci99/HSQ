import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Prejobs from "./components/Prejobs";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPrejobAction } from "./redux/actions/prejob";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrejobAction());
  }, []);
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prejobs" element={<Prejobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
