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
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol, onAceptar, onRechazar }) => {
    const [searchEmail, setSearchEmail] = useState<string>('');
  
    const filteredUsuarios = usuarios.filter(usuario =>
      usuario.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <Buscador
            value={searchEmail}
            onChange={setSearchEmail}
            placeholder="Buscar por email"
            />
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
