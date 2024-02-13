import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Prejobs from "./components/Prejobs";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prejobs" element={<Prejobs />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
