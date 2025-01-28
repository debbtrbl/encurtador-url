const db = require("../db");

// Gera um id curto para a URL
function generateShortUrl() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortUrl = "";
  for (let i = 0; i < 6; i++) {
    shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return shortUrl;
}

// Controlador para encurtar a URL
const shortenUrl = (req, res) => {
  const { longUrl, usuarioId } = req.body;
  const shortUrl = generateShortUrl();

  db.query(
    "INSERT INTO url (usuario_id, long_url, short_url) VALUES (?, ?, ?)",
    [usuarioId, longUrl, shortUrl],
    (err) => {
      if (err) {
        console.error("Erro ao inserir no banco:", err);
        return res.status(500).send("Erro interno do servidor.");
      }
      res.json({ shortUrl });
    }
  );
};

// Controlador para redirecionar a URL curta
const redirectUrl = (req, res) => {
  const { shortUrl } = req.params;

  db.query(
    "SELECT long_url FROM url WHERE short_url = ?",
    [shortUrl],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send("URL não encontrada.");
      }
      res.redirect(results[0].long_url);
    }
  );
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
