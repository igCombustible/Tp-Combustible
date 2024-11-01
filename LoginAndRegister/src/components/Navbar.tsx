import React from "react";
import { Link, To } from "react-router-dom";
import "../assets/css/Navbar.css"


export const Nav = () => {

  const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
          <Link className="navbar-brand" to="/home">Gestion de vehiculos</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item dropdown">
              {roles.includes('ADMIN') && (<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Gestion de vehiculos
              </a>)}
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/vehiculo">Agregar</Link></li>
                <li><Link className="dropdown-item" to="/vehiculo">Editar</Link></li>
                <li><Link className="dropdown-item" to="/vehiculo">Editar</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reportes
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Vehiculos por consumo</a></li>
                <li><a className="dropdown-item" href="#">Cantidad de km recorridos</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              {roles.includes('ADMIN') && (<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Operador
              </a>)}
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Confirmar tickets</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>   
  )
}