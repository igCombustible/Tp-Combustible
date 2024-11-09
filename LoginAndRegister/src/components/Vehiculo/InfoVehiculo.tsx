import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
import { useParams } from 'react-router-dom';
import {Vehiculo} from '../../modelo/Vehiculo'
import {Ticket} from '../../modelo/Ticket'
import '../../assets/css/InfoVehiculo.css'


export const InfoVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>();

    const BUSCARVEHICULO = `vehiculo/${patente}`;
    const TICKETSVEHICULO = `ticket/infoTickets/${patente}`;
    const LITROSCONSUMIDOS = `ticket/consumoTotalCombustible/${patente}`;

    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [consumo, setConsumo] = useState<number | null>(null);

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);

    if (!authContext) {
        throw new Error('No se encontró el contexto de autenticación');
    }
    
    const { auth } = authContext;

    useEffect(() => {
        buscarVehiculo();
        consumoDelVehiculo();
        ticketDelVehiculo();
    }, []);

    const buscarVehiculo = async () => {
        try {
            const response = await apiClient.get(BUSCARVEHICULO);
            setVehiculo(response.data);
        } catch (error) {
            setErrMsgVehiculo('No se pudo cargar los datos del vehículo');
        }
    };

    const consumoDelVehiculo = async () => {
        try {
            const response = await apiClient.get(LITROSCONSUMIDOS);
            setConsumo(response.data);
        } catch (error) {
            setErrMsgTicket('Error al obtener el consumo de combustible');
        } 
    };

    const ticketDelVehiculo = async () => {
        try {
            const response = await apiClient.get(TICKETSVEHICULO);
            setTickets(response.data); 
        } catch (error) {
            setErrMsgTicket('Error al obtener los tickets del vehículo');
        } 
    };

    return (
        <>
            <Nav />
            <div className="vehiculo-info">
                <h2>Información del Vehículo</h2>
                
                {errMsgVehiculo && <p className="error-message">{errMsgVehiculo}</p>}

                {vehiculo ? (
                    <>
                        <div className="vehiculo-caracteristicas">
                            <p><strong>Patente:</strong> {vehiculo?.patente}</p>
                            <p><strong>Marca:</strong> {vehiculo?.marca}</p>
                            <p><strong>Modelo:</strong> {vehiculo?.modelo}</p>
                            <p><strong>Último Kilometraje Conocido:</strong> {vehiculo?.ultimoValorConocidoKm} km</p>
                            <p><strong>Estado del Vehículo:</strong> {vehiculo?.estado_vehiculo ? "Activo" : "Inactivo"}</p>
                            <p><strong>Litros Consumidos:</strong> {consumo} L</p>
                        </div>
    
                        <div className="vehiculo-tickets">
                            <h3>Tickets del Vehículo</h3>
                            {tickets ? (
                                tickets.length > 0 ? (
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Cantidad de Solicitud</th>
                                                    <th>Usuario</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets
                                                    .sort((a, b) => new Date(a.fechaDeSolicitud).getTime() - new Date(b.fechaDeSolicitud).getTime())
                                                    .map((ticket) => (
                                                    <tr key={ticket.id}>
                                                        <td>{new Date(ticket.fechaDeSolicitud).toLocaleDateString()}</td>
                                                        <td>{ticket.cantidadDeSolicitud}</td>
                                                        <td>{ticket.usuario?.email || 'No disponible'}</td> {/* Asegurarse de acceder a usuario.email */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>No hay tickets registrados para este vehículo.</p>
                                )
                            ) : (
                                <p>Cargando tickets...</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Cargando información del vehículo...</p>
                )}
            </div>
        </>
    );
};