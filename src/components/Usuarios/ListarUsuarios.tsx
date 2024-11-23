import React, { useState } from 'react';
import { Usuario } from '../../modelo/Usuario';
import './ListaUsuario.css';

interface ListaUsuariosProps {
    usuarios: Usuario[];
    onAsignarRol: (usuario: Usuario) => void;
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol }) => {
    const [busqueda, setBusqueda] = useState('');

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="usuarios-container">
            <h2>Lista de Usuarios</h2>
            <div className="barra-busqueda">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            
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
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.roles.join(', ')}</td>
                                <td>
                                    <button onClick={() => onAsignarRol(usuario)}>Asignar Rol</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};