import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
import { useParams } from 'react-router-dom';
import {Ticket} from '../../modelo/Ticket'
import './InfoVehiculo.css'
import { Vehiculo } from '../../modelo/Vehiculo';
import { BotonAgregarTicket } from '../Botones/BotonAgregarTicket';
import { BotonEditar } from '../Botones/BotonEditar';
import { BotonEliminar } from '../Botones/BotonEliminar';


export const InfoVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>();

    const BUSCARVEHICULO = `vehiculo/${patente}`;
    const TICKETSVEHICULO = `ticket/aceptados/${patente}`;

    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [vehiculo, setVehiculo] = useState<Vehiculo>();

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);

    if (!authContext) {
        throw new Error('No se encontró el contexto de autenticación');
    }
    
    const { auth } = authContext;
    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

    useEffect(() => {
        buscarVehiculo();
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
                            <p><strong>Patente:</strong> {vehiculo.patente}</p>
                            <p><strong>Marca:</strong> {vehiculo.marca}</p>
                            <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
                            <p><strong>Último Kilometraje Conocido:</strong> {vehiculo.ultimoValorConocidoKm}</p>
                        </div>
                        
                        <div className="botones-accion">
                            {roles.includes('USER') && (
                                <>
                                <BotonAgregarTicket />
                                </>
                            )}
                            {roles.includes('ADMIN') && (
                                <>
                                <BotonEditar patente={vehiculo.patente}/>
                                <BotonEliminar patente={vehiculo.patente}/>
                                </>
                            )}
                  
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
                                                    <th>Litros Consumidos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets
                                                    .sort((a, b) => new Date(a.fechaDeSolicitud).getTime() - new Date(b.fechaDeSolicitud).getTime())
                                                    .map((ticket) => (
                                                    <tr key={ticket.id}>
                                                        <td>{new Date(ticket.fechaDeSolicitud).toLocaleDateString()}</td>
                                                        <td>{ticket.cantidadDeSolicitud}</td>
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