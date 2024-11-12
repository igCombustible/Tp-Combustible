import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const Nav = () => {
  const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Gestión de Vehículos</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reportes
              </a>
              <ul className="dropdown-menu">
                <li><Link className="nav-link active" aria-current="page" to="/vehiculos-por-consumo">Vehiculos por consumo</Link></li>
                <li><a className="dropdown-item" href="#">Cantidad de km recorridos</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              {roles.includes('ADMIN') && (
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Operador
                </a>
              )}
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/ticketsEsperando">Confirmar tickets</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


