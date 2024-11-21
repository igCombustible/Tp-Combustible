import React from "react";
import '../Tickets/BotonesAccion';

interface BotonesAccionProps {
    usuarioId: string;
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({usuarioId, onAceptar, onRechazar }) => (
    <div className="botones-accion">
        <button className="aceptar-button" onClick={() => onAceptar(usuarioId)}>Aceptar</button>
        <button className="rechazar-button" onClick={() => onRechazar(usuarioId)}>Rechazar</button>
    </div>
);