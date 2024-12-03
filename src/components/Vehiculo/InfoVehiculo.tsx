import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
import { useParams } from 'react-router-dom';
import './InfoVehiculo.css'
import { InformacionVehiculo } from '../../modelo/InformacionVehiculo';
import { BotonAgregarTicket } from '../Botones/BotonAgregarTicket';
import { BotonEditar } from '../Botones/BotonEditar';
import { BotonEliminar } from '../Botones/BotonEliminar'


export const InfoVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>();

    const INFOVEHICULO = `/vehiculo/info/${patente}`;

    const [vehiculo, setVehiculo] = useState<InformacionVehiculo>();

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);

    if (!authContext) {
        throw new Error('No se encontró el contexto de autenticación');
    }
    
    const { auth } = authContext;
    const roles = JSON.parse(sessionStorage.getItem('Rol') || '[]');

    useEffect(() => {
        buscarInfoVehiculo();
    }, []);

    const buscarInfoVehiculo = async () => {
        try {
            const response = await apiClient.get(INFOVEHICULO);
            setVehiculo(response.data);
        } catch (error) {
            setErrMsgVehiculo('No se pudo cargar los datos del vehículo');
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
                            <p><strong>Último Kilometraje Conocido:</strong> {vehiculo.km}</p>
                            <p><strong>Litros Consumidos:</strong> {vehiculo.consumo} L</p>
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
                            {vehiculo.tickets ? (
                                vehiculo.tickets.length > 0 ? (
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Litros Consumidos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vehiculo.tickets
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