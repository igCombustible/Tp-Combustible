import React, { useState } from "react";
import { Usuario } from "../../modelo/Usuario";
import "./ListaUsuario.css";
import { Buscador } from "../../Buscador/Buscador";


interface ListaUsuariosProps {
    usuarios: Usuario[]; 
    onAsignarRol: (usuario: Usuario) => void; 
}

export const ListarUsuarios: React.FC<ListaUsuariosProps> = ({ usuarios, onAsignarRol }) => {
  const [searchEmail, setSearchEmail] = useState<string>('');

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="usuarios-container">
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
