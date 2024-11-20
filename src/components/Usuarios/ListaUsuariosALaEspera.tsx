import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import apiClient from "../../api/apiService";
import { Usuario } from "../../modelo/Usuario"; 
import { Nav } from "../NavBar/Navbar";
import {UsuarioTable} from './UsuarioTable';
import "../Vehiculo/ListarVehiculo.css";

export const ListaUsuariosALaEspera = () => {
    const OBTENERUSUARIOS = '/usuario/espera';
    const authContext = useContext(AuthContext);
    const [usuario, setUsuario] = useState<Usuario[]>([]);
    const [error, setError] = useState<string>('');

    const obtenerUsuarios = async () => {
        try {
            const response = await apiClient.get(OBTENERUSUARIOS);
            setUsuario(response.data);
        } catch (err) {
            setError('Error al obtener los usuarios');
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleAceptar = async (id: string) => {
        try {
            await apiClient.put(`/usuario/${id}`);
            obtenerUsuarios();
        } catch (error) {
            console.error("Error al confirmar el usuario", error);
        }
    };

    const handleRechazar = async (id: string) => {
        try {
            await apiClient.delete(`/usuario/${id}`);
            obtenerUsuarios();
        } catch (error) {
            console.error("Error al confirmar el usuario", error);
        }
    };

    return (
        <>
            <Nav />
            <div className="contenedor">
                <div className="header-container">
                    <h1>Usuarios por aceptar</h1>
                    {error && <p className="alert alert-danger">{error}</p>}
                </div>
                <UsuarioTable
                    usuario={usuario} 
                    onAceptar={handleAceptar} 
                    onRechazar={handleRechazar} 
                />
            </div>
        </>
    );
};
