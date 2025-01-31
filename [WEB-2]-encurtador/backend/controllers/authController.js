const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Erro ao buscar no banco:", err);
        return res.status(500).send("Erro interno do servidor.");
      }
      if (results.length === 0) {
        return res.status(401).send("Email ou senha incorretos.");
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("Email ou senha incorretos.");
      }

      const token = jwt.sign({ id: user.id, role: user.role }, "seu_segredo", {
        expiresIn: "1h"
      });

      res.json({ token });
    }
  );
};

const cadastro = (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Erro ao buscar no banco:", err);
        return res.status(500).send("Erro interno do servidor.");
      }
      if (results.length > 0) {
        return res.status(400).send("Email já cadastrado.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO usuario (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role || "usuario"],
        (err) => {
          if (err) {
            console.error("Erro ao inserir no banco:", err);
            return res.status(500).send("Erro interno do servidor.");
          }
          res.status(201).send("Usuário cadastrado com sucesso.");
        }
      );
    }
  );
};

module.exports = {
  login,
  cadastro,
};