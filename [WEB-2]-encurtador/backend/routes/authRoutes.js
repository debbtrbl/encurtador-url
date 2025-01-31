const express = require("express");
const router = express.Router();
const { login, cadastro } = require("../controllers/authController");

// Rota para login
router.post("/login", login);

// Rota para cadastro
router.post("/cadastro", cadastro);

module.exports = router;