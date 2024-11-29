import React, { useState } from "react";
import { Usuario } from "../../modelo/Usuario";
import "./ListaUsuario.css";
import { Buscador } from "../../Buscador/Buscador";
import { UsuarioRow } from './UsuarioRow';
import { EstadoUsuario } from "../../modelo/EstadoUsuario";

interface ListaUsuariosProps {
    usuarios: Usuario[];
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
    onForzar: (usuario: Usuario) => void;
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol, onAceptar, onRechazar , onForzar}) => {
    const [searchEmail, setSearchEmail] = useState<string>('');
    const [estadoFiltro, setEstadoFiltro] = useState<string>('todos');

    const filteredUsuarios = usuarios.filter((usuario) => {
        const matchesEmail = usuario.email.toLowerCase().includes(searchEmail.toLowerCase());
        const matchesEstado = estadoFiltro === 'todos' || usuario.estado === estadoFiltro;
        return matchesEmail && matchesEstado;
    });

    return (
        <div className="usuarios-container">
            <div className="header-container">
                <h1>Lista de Usuarios</h1>
                <div className="filtros-container">
                    <select
                        id="estadoFiltro"
                        value={estadoFiltro}
                        onChange={(e) => setEstadoFiltro(e.target.value)}
                    >
                        <option value="todos">Todos</option>
                        <option value={EstadoUsuario.ACEPTADO}>Aceptado</option>
                        <option value={EstadoUsuario.RECHAZADO}>Rechazado</option>
                        <option value={EstadoUsuario.PENDIENTE}>Pendiente</option>
                    </select>
                </div>

                <Buscador
                    value={searchEmail}
                    onChange={setSearchEmail}
                    placeholder="Buscar por email"
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
                        {filteredUsuarios.map((usuario) => (
                            <UsuarioRow 
                                key={usuario.id} 
                                usuario={usuario} 
                                onAsignarRol={onAsignarRol}
                                onAceptar={onAceptar} 
                                onRechazar={onRechazar} 
                                onForzar={onForzar}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
