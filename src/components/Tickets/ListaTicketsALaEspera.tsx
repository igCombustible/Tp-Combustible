import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import apiClient from "../../api/apiService";
import { Ticket } from "../../modelo/Ticket";
import { Nav } from "../NavBar/Navbar";
import { TicketTable } from "./TicketTable";
import "../Vehiculo/ListarVehiculo.css";

export const ListaTicketsALaEspera = () => {
    const OBTENERTICKETS = '/ticket/espera';
    const authContext = useContext(AuthContext);
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
            await apiClient.put(`/ticket/${id}`);
            obtenerTickets();
        } catch (error) {
            console.error("Error al confirmar el ticket", error);
        }
    };

    const handleRechazar = async (id: string) => {
        try {
            await apiClient.delete(`/ticket/${id}`);
            obtenerTickets();
        } catch (error) {
            console.error("Error al confirmar el ticket", error);
        }
    };

    return (
        <>
            <Nav />
            <div className="contenedor">
                <div className="header-container">
                    <h1>Tickets por aceptar</h1>
                    {error && <p className="alert alert-danger">{error}</p>}
                </div>
                <TicketTable 
                    tickets={tickets} 
                    onAceptar={handleAceptar} 
                    onRechazar={handleRechazar} 
                />
            </div>
        </>
    );
};
