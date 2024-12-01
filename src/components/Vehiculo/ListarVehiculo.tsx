import { useEffect, useState } from "react";
import React from "react";
import apiClient from '../../api/apiService';
import { Vehiculo } from "../../modelo/Vehiculo";
import "./ListarVehiculo.css";
import "../Botones/Boton.css";
import { Link } from "react-router-dom";
import { Buscador } from "../../Buscador/Buscador";
import { BotonEditar } from "../Botones/BotonEditar";
import { BotonEliminar } from "../Botones/BotonEliminar";
import { BotonVerInfo } from "../Botones/BotonVerInfo";
import { BotonAgregarTicket } from "../Botones/BotonAgregarTicket";

export const ListarVehiculo = () => {
  const OBTENERVEHICULOS = '/vehiculo';
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [searchPatente, setSearchPatente] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const response = await apiClient.get(OBTENERVEHICULOS);
        setVehiculos(response.data);
      } catch (err: any) {
        setError('Error al obtener los vehículos');
      }
    };
    obtenerVehiculos();
  }, []);

  const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

  const filteredVehiculos = vehiculos.filter(vehiculo =>
    vehiculo.patente.toLowerCase().includes(searchPatente.toLowerCase())
  );

  return (
    <div className="contenedor">
      <div className="header-container">
        <h1>Lista de Vehículos</h1>
        {roles.includes('ADMIN') && (
          <Link to={`/crearVehiculo`}>
            <button className="create-button">Agregar</button>
          </Link>
        )}
        <Buscador
          value={searchPatente}
          onChange={setSearchPatente}
          placeholder="Buscar por patente"
        />
      </div>
      {error && <p>{error}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehiculos.map((vehiculo) => (
              <tr key={vehiculo.patente}>
                <td>{vehiculo.patente}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>
                  <div className="botones-accion">
                    {roles.includes('USER') && (
                      <>
                        <BotonAgregarTicket patente={vehiculo.patente}/>
                        <BotonVerInfo patente={vehiculo.patente} />
                      </>
                    )}
                    {roles.includes('ADMIN') && (
                      <>
                        <BotonEditar patente={vehiculo.patente}/>
                        <BotonEliminar patente={vehiculo.patente}/>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
