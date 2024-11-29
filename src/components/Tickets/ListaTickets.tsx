import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiService";
import { Nav } from "../NavBar/Navbar";


interface Ticket {
    id: string;
    cantidadDeSolicitud: number;
    fechaDeSolicitud: string;
    id_usuario: string;
    patente: string;
    estado: string;
}

export const ListaTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const obtenerTickets = async () => {
            try {
                const response = await apiClient.get('/ticket');
                setTickets(response.data);
            } catch (err) {
                setError('Error al obtener los tickets');
            }
        };
        obtenerTickets();
    }, []);

    return (
        <>
            <Nav />

            <div className="header-container">
                <h1>Lista de Tickets</h1>
                {error && <p>{error}</p>}
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cantidad de Solicitud</th>
                            <th>Fecha de Solicitud</th>
                            <th>ID Usuario</th>
                            <th>Patente</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.cantidadDeSolicitud}</td>
                                <td>{new Date(ticket.fechaDeSolicitud).toLocaleDateString()}</td>
                                <td>{ticket.id_usuario}</td>
                                <td>{ticket.patente}</td>
                                <td>{ticket.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
