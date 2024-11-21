
import React from "react";
import { Usuario } from "../../modelo/Usuario";
import { BotonesAccion } from "./BotonesAccion";

interface UsuarioRowProps {
    usuario: Usuario;
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const UsuarioRow: React.FC<UsuarioRowProps> = ({ usuario, onAceptar, onRechazar }) => {
    const { id, email, estado } = usuario;

    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>{estado}</td>
            <td>
                <BotonesAccion 
                    usuarioId={id} 
                    onAceptar={onAceptar} 
                    onRechazar={onRechazar} 
                />
            </td>
        </tr>
    );
};
