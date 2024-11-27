import React, { useState } from "react";
import { Usuario } from "../../modelo/Usuario";
import "./ListaUsuario.css";
import { Buscador } from "../../Buscador/Buscador";
import { UsuarioRow } from './UsuarioRow';

interface ListaUsuariosProps {
    usuarios: Usuario[];
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
    onForzar : (usuario: Usuario) => void;
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol, onAceptar, onRechazar,onForzar}) => {
    const [searchEmail, setSearchEmail] = useState<string>('');
  
    const filteredUsuarios = usuarios.filter(usuario =>
      usuario.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  
    return (
        <div className="usuarios-container">
            <div className="header-container">
                <h1>Lista de Usuarios</h1>
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
