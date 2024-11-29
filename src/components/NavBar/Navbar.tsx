import React from "react";
import { Link } from "react-router-dom";
import "../NavBar/Navbar.css";
import { BotonCerrarSesion } from "../Botones/BotonCerrarSesion";

export const Nav = () => {
  const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <i className="bi bi-fuel-pump-fill" id="icono-app"></i>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/vehiculos">Lista de vehiculos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/usuarios">Lista de usuarios</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reportes
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" aria-current="page" to="/vehiculos-por-consumo">Vehiculos por consumo</Link></li>
                <li><Link className="dropdown-item" aria-current="page" to="/vehiculos-por-promedio-km">Vehiculos por promedio de Km recorridos por consumo</Link></li>
              </ul>
              </li>
              {roles.includes('OPERADOR') && (
                <li><Link className="nav-link active" to="/ticketsEsperando">Confirmar tickets</Link></li>
              )} 
              
            </ul>
          </div>
          <div className="cerrar-sesion">
            <BotonCerrarSesion />
          </div>
      </div>
    </nav>
  );
};


