import React, { useContext, useEffect, useState } from "react";
import { ConsumoVehiculo } from "../../modelo/ConsumoVehiculo";
import apiClient from "../../api/apiService";
import { Nav } from "../NavBar/Navbar";

export const ConsumoVehiculos = () => {
    const [consumos, setConsumos] = useState<ConsumoVehiculo[]>([]);

    const CONSUMOS = '/vehiculo/estadisticas';
    

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);


    useEffect(() => {
        buscarConsumos();
    }, []);

    const buscarConsumos = async () => {
        try {
            const response = await apiClient.get(CONSUMOS);
            setConsumos(response.data);
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
                {errMsgTicket && <p className="error-message">{errMsgTicket}</p>}
    
                {consumos ? (
                    <div className="vehiculo-tickets">
                        <h3>Consumo por Vehículo</h3>
                        <div className="table-container">
                            <table className="consumo-vehiculo">
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Consumo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {[...consumos]
                                            .sort((a, b) => b.consumo - a.consumo)
                                            .map((consumo) => (
                                        <tr key={consumo.patente}>
                                            <td>{consumo.patente}</td>
                                            <td>{consumo.marca}</td>
                                            <td>{consumo.modelo}</td>
                                            <td>{consumo.consumo}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>No se encontró información del vehículo.</p>
                )}
            </div>
        </>
    );
}

