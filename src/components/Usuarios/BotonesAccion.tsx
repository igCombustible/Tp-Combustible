import React from "react";
import '../Botones/Boton.css';
import { Usuario } from "../../modelo/Usuario";
import { EstadoUsuario } from "../../modelo/EstadoUsuario"
import { EstadoPassword } from "../../modelo/EstadoPassword";

interface BotonesAccionProps {
    usuario: Usuario;
    onAsignarRol: (usuario: Usuario) => void;
    onAceptar: (usuario: Usuario) => void;
    onRechazar: (usuario: Usuario) => void;
    onForzar: (usuario: Usuario) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({usuario, onAsignarRol, onAceptar, onRechazar,onForzar }) =>{ 
    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');
    
    return (
    <div className="botones-accion">
        { usuario.estado === EstadoUsuario.PENDIENTE  && roles.includes('OPERADOR') &&(
            <>
                <button className="aceptar-button" 
                        onClick={() => onAceptar(usuario)}
                        data-tooltip="Aceptar">
                            <i className="bi bi-check2"></i>
                </button>
                <button className="rechazar-button" 
                        onClick={() => onRechazar(usuario)}
                        data-tooltip="Rechazar">
                            <i className="bi bi-x-lg"></i>
                </button>
            </>
        )}
        { usuario.estado === EstadoUsuario.ACEPTADO  && roles.includes('ADMIN') &&(
          <>
          <button className="asignar-button" 
                    onClick={() => onAsignarRol(usuario)}
                    data-tooltip="Asignar rol">
                        <i className="bi bi-person-fill-add"></i>
                    
            </button>
            {usuario.estadop === EstadoPassword.HABILITADO && (
            <button className="forzar-button" 
                        onClick={() => onForzar(usuario)}
                        data-tooltip="Deshabilitar contraseña">
                            <i className="bi bi-unlock-fill"></i>
                </button>
               
            )}
         </> 
             
        )}
        { usuario.estado === EstadoUsuario.RECHAZADO  && roles.includes('OPERADOR') && (
            <button className="restaurar-button" 
                    onClick={() => onAceptar(usuario)}
                    data-tooltip="Restaurar usuario">
                    <i className="bi bi-person-fill-up"></i>
                    </button>
        )}
    </div>
)};