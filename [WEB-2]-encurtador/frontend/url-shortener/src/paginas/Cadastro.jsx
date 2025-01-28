import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import axios from "axios"; 

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login"); 
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h1 className="text-center">Cadastro</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-encurtar w-100">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
