import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Usuario } from '../../modelo/Usuario';
import { Nav } from '../NavBar/Navbar';
import { ListaUsuariosAceptados } from './ListaUsuariosAceptados';

export const UsuariosAceptados = () => {
    const OBTENERUSUARIOSACEPTADOS = '/usuario/aceptados';
    const authContext = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState<string>('');

    const obtenerUsuariosAceptados = async () => {
        try {
            const response = await apiClient.get(OBTENERUSUARIOSACEPTADOS);
            setUsuarios(response.data);
        } catch (err) {
            setError('Error al obtener los usuarios aceptados');
        }
    };

    useEffect(() => {
        obtenerUsuariosAceptados();
    }, []);

    return (
        <>
            <Nav />
            <div className="contenedor">
                {error && <p className="error">{error}</p>}
                <ListaUsuariosAceptados usuarios={usuarios} />
            </div>
        </>
    );
};
