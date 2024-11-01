import { useContext, useEffect, useState } from "react";
import React from "react";
import AuthContext from "../context/AuthProvider";
import apiClient  from '../api/apiService'
import "../assets/css/ListarVehiculo.css"
import { Navigate, useNavigate } from "react-router-dom";

interface Vehiculo {
    marca: string;
    modelo: string;
    patente: string;
    ultimoValorConocidoKm: number;
    estado_vehiculo: boolean;
  }

export const ListarVehiculo = () => {
    
    const OBTENERVEHICULOS = '/vehiculo';
    const authContext = useContext(AuthContext);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const navigate = useNavigate(); 
    
    if (!authContext){
        throw new Error('asdasd');
    }
    
    const {auth,setAuth} = authContext;
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

    return (
        <>
        <div>
            <div className="header-container">
                <h1>Lista de Vehículos</h1>
                <button className="create-button" onClick={() => handleCreate()}>Agregar</button>
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

