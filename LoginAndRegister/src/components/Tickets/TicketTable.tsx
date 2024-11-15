import React from "react";
import { Ticket } from "../../modelo/Ticket";
import { TicketRow } from "./TicketRow";

interface TicketTableProps {
    tickets: Ticket[];
    onAceptar: (id: string) => void;
    onRechazar: (id: string) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({ tickets, onAceptar, onRechazar }) => (
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Vehículo</th>
                    <th>Cantidad de Solicitud</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Aceptar</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <TicketRow 
                        key={ticket.id} 
                        ticket={ticket} 
                        onAceptar={onAceptar} 
                        onRechazar={onRechazar} 
                    />
                ))}
            </tbody>
        </table>
    </div>
);