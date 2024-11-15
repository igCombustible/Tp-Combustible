import React from "react";
import './Botones.css';

interface BotonesAccionProps {
    ticketId: string;
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({ ticketId, onAceptar, onRechazar }) => (
    <div className="botones-accion">
        <button className="aceptar-button" onClick={() => onAceptar(ticketId)}>Aceptar ticket</button>
        <button className="rechazar-button" onClick={() => onRechazar(ticketId)}>Rechazar ticket</button>
    </div>
);
