import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import apiClient from "../../api/apiService";
import "../Vehiculo/ListarVehiculo.css"
import { Ticket } from "../../modelo/Ticket"
import { Nav } from "../NavBar/Navbar";

export const ListaTicketsALaEspera = () => {
    const OBTENERTICKETS = '/ticket';
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string>('');

    const obtenerTickets = async () => {
        try {
            const response = await apiClient.get(OBTENERTICKETS);
            setTickets(response.data);
        } catch (err) {
            setError('Error al obtener los tickets');
        }
    };

    useEffect(() => {
        obtenerTickets();
    }, []);

    const handleAceptar = async (id: string) => {
        try {
            const responseAceptar = await apiClient.put(`/ticket/${id}`);
            obtenerTickets();
        } catch (error) {
            console.error("Error al confirmar el ticket", error);
        }
    };

    const handleRechazar = async (id: string) => {
        try {
            const responseAceptar = await apiClient.delete(`/ticket/${id}`);
            obtenerTickets();
        } catch (error) {
            console.error("Error al confirmar el ticket", error);
        }
    };

    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="contenedor">
                <div className="header-container">
                    <h1>Tickets por aceptar</h1>
                    {error && <p className="alert alert-danger">{error}</p>}
                </div>

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
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.vehiculo.patente}</td>
                                    <td>{ticket.cantidadDeSolicitud}</td>
                                    <td>{new Date(ticket.fechaDeSolicitud).toLocaleDateString()}</td>
                                    <td>{ticket.usuario.email}</td>
                                    <td>
                                        <div className="botones-accion">
                                            <button className="aceptar-button" onClick={() => handleAceptar(ticket.id)}>Aceptar ticket</button>
                                            <button className="rechazar-button" onClick={() => handleRechazar(ticket.id)}>rechazar ticket</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
