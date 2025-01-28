import React, { useState } from "react";
import axios from "axios";
import Navbar from "../componentes/Navbar";

function ShortenUrl() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const response = await axios.post("http://localhost:3001/shorten", { longUrl });
      setShortUrl(`http://localhost:3001/${response.data.shortUrl}`);
    } catch (err) {
      setError("Erro ao encurtar a URL. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">Encurtador de URL</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="urlInput" className="form-label">Insira a URL:</label>
                    <input
                      type="url"
                      className="form-control"
                      id="urlInput"
                      placeholder="https://exemplo.com"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-encurtar w-100">Encurtar URL</button>
                </form>
                {shortUrl && (
                  <div className="mt-3 text-center">
                    <p className="text-success">URL Encurtada:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                  </div>
                )}
                {error && (
                  <div className="mt-3 text-center text-danger">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortenUrl;
