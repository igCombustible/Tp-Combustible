import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Navbar.tsx";
import apiClient from "../../api/apiService.tsx";
import "../../assets/css/ListarVehiculo.css"
import "./Ticket"

export const ListaTicketsALaEspera = () => {
    const OBTENERTICKETS = '/ticket/espera';
    const authContext = useContext(AuthContext);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error('El contexto de autenticación no está disponible.');
    }

    useEffect(() => {
        const obtenerVehiculos = async () => {
        try {
            const response = await apiClient.get(OBTENERTICKETS);
            setTickets(response.data);
        } catch (err: any) {
            setError('Error al obtener los tickets');
        } 
      };
            obtenerVehiculos(); 
    }, []);

    const handleAceptar = (id: string) => {
        navigate(`/aceptarTicket/${id}`);
    };

    return (
        <>
            <div>
                <Nav />
            </div>

            {/* busqueda de tickets */}

            <div className="header-container">
                <h1>Tickets por aceptar</h1>
                {error && <p>{error}</p>}
            </div>
            <div>
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
                                            <button className="edit-button" onClick={() => handleAceptar(ticket.id)}>Aceptar ticket</button>
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
