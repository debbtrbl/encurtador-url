import React from "react";
import { FaLink } from "react-icons/fa";
import { VscAccount, VscArchive, VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom"; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand logo" href="#">
          <FaLink size={34} /> EncurtaAí
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" title="Perfil" to="/profile"> 
                <VscAccount size={34} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" title="Minhas Urls" to="/my-urls">  
                <VscArchive size={34} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-danger" title="Sair" to="/login">  
                <VscSignOut size={34} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
