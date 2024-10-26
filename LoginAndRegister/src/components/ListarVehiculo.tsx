import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import "../assets/css/ListarVehiculo.css"

interface Vehiculo {
    marca: string;
    modelo: string;
    patente: string;
    ultimo_km: number;
    estado_vehiculo: boolean;
  }

export const ListarVehiculo = () => {
    
    const OBTENERVEHICULOS = '/auth/vehiculo/todosLosVehiculos';
    const authContext = useContext(AuthContext);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    
    if (!authContext){
        throw new Error('asdasd');
    }
    
    const {auth,setAuth} = authContext;
    const [error, setError] = useState<string>('')
    
    useEffect(() => {
        const obtenerVehiculos = async () => {
        try {
            const response = await axios.get(OBTENERVEHICULOS,
                { headers: { 
                  'Authorization': `Bearer ${auth.accessToken}`, 
                  'Content-Type': 'application/json' 
                }, withCredentials: true});
            setVehiculos(response.data);
        } catch (err: any) {
            setError('Error al obtener los vehículos');
        } 
      };
            obtenerVehiculos(); 
    }, []);

    return (
        <>
        <div>
            <h1>Lista de Vehículos</h1>
                {error && <p>{error}</p>}
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Patente</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ultimo kilometraje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map((vehiculo) => (
                        <>
                        <tr>
                            <td>{vehiculo.patente}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.ultimo_km}</td>
                        </tr>
                        </>))}
                    </tbody>
                </table>
                </div>
                    
        </div>
        </>
    );
};

