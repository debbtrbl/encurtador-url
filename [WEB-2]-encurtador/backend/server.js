const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Adicionar rotas
app.use(urlRoutes);
app.use(authRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
