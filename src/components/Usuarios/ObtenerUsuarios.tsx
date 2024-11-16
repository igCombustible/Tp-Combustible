import React, { useEffect, useState } from 'react';
import { ListarUsuarios } from './ListarUsuarios';
import { Usuario } from '../../modelo/Usuario';
import apiClient from '../../api/apiService';
import { Nav } from '../NavBar/Navbar';
import { Modal } from './Modal';
import './Modal.css';

export const ObtenerUsuarios = () => {
    const OBTENER_USUARIOS = '/usuario';
    const OBTENER_ROLES = '/rol'; 
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

    // Obtener usuarios
    const obtenerUsuarios = async () => {
        try {
            const response = await apiClient.get(OBTENER_USUARIOS);
            setUsuarios(response.data);
        } catch {
            alert('Error al obtener los usuarios');
        }
    };

    // Obtener roles
    const obtenerRoles = async () => {
        try {
            const response = await apiClient.get(OBTENER_ROLES);
            setRoles(response.data);
        } catch {
            alert('Error al obtener los roles');
        }
    };

    useEffect(() => {
        obtenerRoles();
        obtenerUsuarios();
    }, []);

    // Función para asignar rol
    const handleAsignarRol = async (usuarioId: string, rol: string) => {
        try {
            await apiClient.put(`/usuario/asigna/${usuarioId}`, { name: rol });
            obtenerUsuarios();
            setSelectedUser(null);
        } catch {
            alert('Error al asignar el rol');
        }
    };

    return (
        <>
            <Nav />
            <ListarUsuarios usuarios={usuarios} onAsignarRol={(usuario) => setSelectedUser(usuario)} />
            {selectedUser && (
                <Modal
                    usuario={selectedUser}
                    roles={roles}
                    onClose={() => setSelectedUser(null)}
                    onAsignar={(rol) => handleAsignarRol(selectedUser.id, rol)}
                />
            )}
        </>
    );
};
