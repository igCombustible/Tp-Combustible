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

    const handleForzar = async (id: string, email: string) => {
        try {
            const response = await apiClient.delete(`/usuario/deshabilita/${id}`);
             alert(response.data); 
            obtenerUsuarios(); 
        } catch (error) {
            console.error("Error al deshabilitar la contraseña del usuario", error);
             alert("Hubo un error al intentar deshabilitar la contraseña");
        }
    };



    return (
        <>
            <Nav />
            <ListarUsuarios usuarios={usuarios} onAsignarRol={(usuario) => setSelectedUser(usuario)} onAceptar={(usuario) => handleAceptar(usuario.id)} onRechazar={(usuario) => handleRechazar(usuario.id)}onForzar={(usuario) => handleForzar(usuario.id, usuario.email)} />
            {selectedUser && (
                <Modal
                    usuario={selectedUser}
                    roles={roles}
                    onClose={() => setSelectedUser(null)}
                    onAsignar={(rol:any) => handleAsignarRol(selectedUser.id, rol)}
                />
            )}
        </>
    );
};
