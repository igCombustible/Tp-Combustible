import React from 'react';
import { Usuario } from '../../modelo/Usuario';
import './ListaUsuario.css';

interface ListaUsuariosAceptadosProps {
    usuarios: Usuario[];
}

export const ListaUsuariosAceptados: React.FC<ListaUsuariosAceptadosProps> = ({ usuarios }) => (
    <div className="usuarios-aceptados-container">
        <h2>Lista de Usuarios Aceptados</h2>
        <div className="usuarios-aceptados-table-container">
            <table className="usuarios-aceptados-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.email}</td>
                            <td>{usuario.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);