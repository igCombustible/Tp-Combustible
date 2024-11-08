
import { useContext, useEffect, useState } from "react";
import React from "react";
import apiClient  from '../../api/apiService'
import { Vehiculo } from "../../modelo/Vehiculo"
import "./ListarVehiculo.css"

import { Navigate, useNavigate } from "react-router-dom";

export const ListarVehiculo = () => {
    
    const OBTENERVEHICULOS = '/vehiculo';
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [searchPatente, setSearchPatente] = useState<string>(''); // Estado para la patente de búsqueda
    const navigate = useNavigate(); 
    
    
    const [error, setError] = useState<string>('')
    
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

    const handleCreate = () => {
        navigate(`/crearVehiculo`);
    };

    const handleInfo = (patente: string) => {
        
    };

    const handleEdit = (patente: string) => {
        navigate(`/editarVehiculo/${patente}`);
    };
    const handleDelete = (patente: string) => {
        navigate(`/eliminarVehiculo/${patente}`);
    };

    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');
    
    const filteredVehiculos = vehiculos.filter(vehiculo =>
        vehiculo.patente.toLowerCase().includes(searchPatente.toLowerCase())
    );



    return (
        <>
        <div className="contenedor">
            <div className="header-container">
                <h1>Lista de Vehículos</h1>
                <button className="create-button" onClick={() => handleCreate()}>Agregar</button>
            </div>
            <input
                    type="text"
                    placeholder="Buscar por patente..."
                    value={searchPatente}
                    onChange={(e) => setSearchPatente(e.target.value)}
                    className="search-input" 
                />
            
            {error && <p>{error}</p>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Patente</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            {roles.includes('ADMIN') && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehiculos.map((vehiculo) => (
                            <tr key={vehiculo.patente}>
                                <td>{vehiculo.patente}</td>
                                <td>{vehiculo.marca}</td>
                                <td>{vehiculo.modelo}</td>
                                {roles.includes('ADMIN') && (
                                    <td>
                                        <div className="botones-accion">
                                            <button className="info-button" onClick={() => handleInfo(vehiculo.patente)}>Info</button>
                                            <button className="edit-button" onClick={() => handleEdit(vehiculo.patente)}>Editar</button>
                                            <button className="delete-button" onClick={() => handleDelete(vehiculo.patente)}>Eliminar</button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                    
        </div>
        </>
    );
};
