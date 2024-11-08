import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "../../context/AuthProvider";
import apiClient  from '../../api/apiService'
import "../../assets/css/ListarVehiculo.css"
import "./Vehiculo"

import { Link, Navigate, useNavigate } from "react-router-dom";

export const ListarVehiculo = () => {
    
    const OBTENERVEHICULOS = '/vehiculo';
    const authContext = useContext(AuthContext);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const navigate = useNavigate(); 
    
    if (!authContext){
        throw new Error('asdasd');
    }
    
    
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
        navigate(`/infoVehiculo/${patente}`);
    };

    const handleEdit = (patente: string) => {
        navigate(`/editarVehiculo/${patente}`);
    };
    const handleDelete = (patente: string) => {
        navigate(`/eliminarVehiculo/${patente}`);
    };

    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

    return (
        <>
        <div className="titulo-y-tabla">
            <div className="header-container">
                <h1>Lista de Vehículos</h1>
                {roles.includes('ADMIN') && (
                    <button className="create-button" onClick={() => handleCreate()}>Agregar</button>
                )}
            </div>
            
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
                        {vehiculos.map((vehiculo) => (
                            <tr key={vehiculo.patente}>
                                <td>{vehiculo.patente}</td>
                                <td>{vehiculo.marca}</td>
                                <td>{vehiculo.modelo}</td>
                                <td>
    <div className="botones-accion">
        {roles.includes('USER') && (
            <Link to={`/infoVehiculo/${vehiculo.patente}`}><button>Ver Info</button></Link>
        )}
        {roles.includes('ADMIN') && (
            <>
                <button className="edit-button" onClick={() => handleEdit(vehiculo.patente)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(vehiculo.patente)}>Eliminar</button>
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
        </>
    );
};

