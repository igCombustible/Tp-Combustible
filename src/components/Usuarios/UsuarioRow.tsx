
import React from "react";
import { Usuario } from "../../modelo/Usuario";
import { BotonesAccion } from "./BotonesAccion";

interface UsuarioRowProps {
    usuario: Usuario;
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
    onForzar: (usuario: Usuario) => void;
}

export const UsuarioRow: React.FC<UsuarioRowProps> = ({ usuario, onAsignarRol, onAceptar, onRechazar,onForzar }) => {

    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

    return (
        <tr>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.roles.join(", ")}</td>
            {(roles.includes('ADMIN') || roles.includes('OPERADOR')) &&(
                <td>
                    <BotonesAccion 
                        usuario={usuario} 
                        onAsignarRol={onAsignarRol}
                        onAceptar={onAceptar} 
                        onRechazar={onRechazar} 
                        onForzar={onForzar}
                    />
                </td>
            )}
        </tr>
    );
};
