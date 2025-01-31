const db = require("../db");

const logAccess = (req, res, next) => {
  const { shortUrl } = req.params;
  const ip = req.ip;
  const location = "desconhecida"; 

  db.query(
    "SELECT id FROM url WHERE short_url = ?",
    [shortUrl],
    (err, results) => {
      if (err || results.length === 0) {
        return next();
      }

      const urlId = results[0].id;

      db.query(
        "INSERT INTO accesso (url_id, ip, location) VALUES (?, ?, ?)",
        [urlId, ip, location],
        (err) => {
          if (err) {
            console.error("Erro ao registrar acesso:", err);
          }
          next();
        }
      );
    }
  );
};

module.exports = {
  logAccess,
};