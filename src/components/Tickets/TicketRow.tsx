import React from "react";
import { Ticket } from "../../modelo/Ticket";
import { BotonesAccion } from "./BotonesAccion";

interface TicketRowProps {
    ticket: Ticket;
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const TicketRow: React.FC<TicketRowProps> = ({ ticket, onAceptar, onRechazar }) => (
    <tr>
        <td>{ticket.id}</td>
        <td>{ticket.vehiculo.patente}</td>
        <td>{ticket.cantidadDeSolicitud}</td>
        <td>{new Date(ticket.fechaDeSolicitud).toLocaleDateString()}</td>
        <td>{ticket.usuario.email}</td>
        <td>
            <BotonesAccion 
                ticketId={ticket.id} 
                onAceptar={onAceptar} 
                onRechazar={onRechazar} 
            />
        </td>
    </tr>
);
