import "../Home.css"; 
import React, { useState } from 'react';
import {AgregarVehiculo} from './AgregarVehiculo'

export const Home = () => {

    const [addVehiculo,setAddVehiculo] = useState(false);

    function handleAgregarVehiculo(e): void {
        setAddVehiculo(true);
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">nombre del usuario</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar vehiculo" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
        <div>
            <button
            className="btn btn-primary"
            onClick={handleAgregarVehiculo}
            >Agregar vehiculo
            </button>
        </div>
        <div>
            {addVehiculo ? (
                <section>
                    <AgregarVehiculo />
                </section>
            ) : null}
        </div>
        </>
    );
};
