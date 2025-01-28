import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Perfil from "./paginas/Perfil";
import MinhasUrls from "./paginas/MinhasUrls";
import Detalhes from "./paginas/Detalhes";
import ShortenUrl from "./paginas/Encurtador";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenUrl />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/my-urls" element={<MinhasUrls />} />
        <Route path="/url/:id" element={<Detalhes />} />
      </Routes>
    </Router>
  );
}

export default App;
