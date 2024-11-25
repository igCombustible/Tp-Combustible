import { useEffect, useState } from "react";
import React from "react";
import apiClient from '../../api/apiService';
import { Vehiculo } from "../../modelo/Vehiculo";
import "./ListarVehiculo.css";
import { Link } from "react-router-dom";
import { Buscador } from "../../Buscador/Buscador";

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
                      <Link to={'/agregarTicket'}>
                        <button className="create-ticket-button">Crear Ticket</button>
                      </Link>
                    )}
                    {roles.includes('ADMIN') && (
                      <>
                        <Link to={`/editarVehiculo/${vehiculo.patente}`}>
                          <button className="edit-button">Editar</button>
                        </Link>
                        <Link to={`/eliminarVehiculo/${vehiculo.patente}`}>
                          <button className="delete-button">Eliminar</button>
                        </Link>
                      </>
                    )}
                    <Link to={`/infoVehiculo/${vehiculo.patente}`}>
                      <button className="info-button">Ver Info</button>
                    </Link>
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
