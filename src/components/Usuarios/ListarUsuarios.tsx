import React from 'react';
import { Usuario } from '../../modelo/Usuario';
import './ListaUsuario.css';
import { UsuarioRow } from './UsuarioRow';

interface ListaUsuariosProps {
    usuarios: Usuario[];
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol, onAceptar, onRechazar }) => (
    <div className="usuarios-container">
        <h2>Lista de Usuarios</h2>
        <div className="usuarios-table-container">
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <UsuarioRow 
                            key={usuario.id} 
                            usuario={usuario} 
                            onAsignarRol={onAsignarRol}
                            onAceptar={onAceptar} 
                            onRechazar={onRechazar} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
