const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/urlcontroller");
const { logAccess } = require("../controllers/accessController");

// Rota para encurtar a URL
router.post("/shorten", shortenUrl);

// Rota para redirecionar a URL curta, registrando o acesso antes
router.get("/:shortUrl", logAccess, redirectUrl);

module.exports = router;
