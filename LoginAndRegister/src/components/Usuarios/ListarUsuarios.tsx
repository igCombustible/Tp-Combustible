import React from 'react';
import { Usuario } from '../../modelo/Usuario';

interface ListaUsuariosProps {
    usuarios: Usuario[];
    onAsignarRol: (usuario: Usuario) => void;
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol }) => (
    <div className="usuarios-container">
        <h2>Lista de Usuarios</h2>
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
                    <tr key={usuario.id}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.roles.join(", ")}</td>
                        <td>
                            <button onClick={() => onAsignarRol(usuario)}>Asignar Rol</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
