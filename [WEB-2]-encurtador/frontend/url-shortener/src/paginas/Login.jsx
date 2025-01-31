import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import axios from "axios"; // Importando o Axios

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token); // Armazena o token no localStorage
        navigate("/"); // Redireciona para a página de encurtar URL
      } else {
        alert("Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h1 className="text-center">Login</h1>
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-encurtar w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
              <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;