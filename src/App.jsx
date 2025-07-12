import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./features/LandingPage";
import ClientA from "./features/ClientA";
import ClientB from "./features/ClientB";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/clientA" element={<ClientA />} />
        <Route path="/clientB" element={<ClientB />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
