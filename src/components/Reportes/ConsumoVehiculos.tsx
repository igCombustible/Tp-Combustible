import React, { useContext, useEffect, useState } from "react";
import { InformacionVehiculo } from "../../modelo/InformacionVehiculo";
import apiClient from "../../api/apiService";
import { Nav } from "../NavBar/Navbar";

export const ConsumoVehiculos = () => {
    const [consumos, setConsumos] = useState<InformacionVehiculo[]>([]);

    const CONSUMOS = '/reporte/info';
    

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
                {errMsgVehiculo && <p className="error-message">{errMsgVehiculo}</p>}
                {errMsgTicket && <p className="error-message">{errMsgTicket}</p>}
    
                {consumos ? (
                    <div className="vehiculo-tickets">
                        <h1>Consumo por Vehículo</h1>
                        <div className="table-container">
                            <table className="consumo-vehiculo">
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Consumo total</th>
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

