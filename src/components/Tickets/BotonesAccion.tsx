import React from "react";
import '../Botones/Boton.css';

interface BotonesAccionProps {
    ticketId: string;
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({ ticketId, onAceptar, onRechazar }) => (
    <div className="botones-accion">
        <button className="aceptar-button" onClick={() => onAceptar(ticketId)}><i className="bi bi-check2"></i></button>
        <button className="rechazar-button" onClick={() => onRechazar(ticketId)}><i className="bi bi-x-lg"></i></button>
    </div>
);
