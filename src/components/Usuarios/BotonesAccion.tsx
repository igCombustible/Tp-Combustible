import React from "react";
import '../Tickets/BotonesAccion';
import { Usuario } from "../../modelo/Usuario";
import { EstadoUsuario } from "../../modelo/EstadoUsuario"

interface BotonesAccionProps {
    usuario: Usuario;
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({usuario, onAsignarRol, onAceptar, onRechazar }) =>{ 
    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');
    
    return (
    <div className="botones-accion">
        { usuario.estado === EstadoUsuario.PENDIENTE  && roles.includes('OPERADOR') &&(
            <>
                <button className="aceptar-button" onClick={() => onAceptar(usuario)}>Aceptar</button>
                <button className="rechazar-button" onClick={() => onRechazar(usuario)}>Rechazar</button>
            </>
        )}
        { usuario.estado === EstadoUsuario.ACEPTADO  && roles.includes('ADMIN') && (
            <button className="rechazar-button" onClick={() => onAsignarRol(usuario)}>Asignar Rol</button>
        )}
        { usuario.estado === EstadoUsuario.RECHAZADO  && roles.includes('OPERADOR') && (
            <button className="aceptar-button" onClick={() => onAceptar(usuario)}>Darle Segunda Oportunidad</button>
        )}
    </div>
)};