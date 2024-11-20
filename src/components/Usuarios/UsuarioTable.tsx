import React from "react";
import { Usuario } from "../../modelo/Usuario"; 
import { UsuarioRow } from "./UsuarioRow";  

interface UsuarioTableProps {
    usuario: Usuario[];
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const UsuarioTable: React.FC<UsuarioTableProps> = ({ usuario, onAceptar, onRechazar }) => (
    <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {usuario.map((usuario) => (
                <UsuarioRow 
                    key={usuario.id} 
                    usuario={usuario} 
                    onAceptar={onAceptar} 
                    onRechazar={onRechazar} 
                />
            ))}
        </tbody>
        </table>
    </div>
);
