import { useState, useEffect } from "react";
import apiClient from "../../api/apiService";
import { InformacionVehiculo } from "../../modelo/InformacionVehiculo";
import React from "react";
import { Nav } from "../NavBar/Navbar";
import './Reportes.css';

export const ConsumoPorKm = () => {
    const [reportes, setReportes] = useState<InformacionVehiculo[]>([]);

    const INFOVEHICULO = '/reporte/info';
    

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);


    useEffect(() => {
        buscarPromedios();
    }, []);


    const buscarPromedios = async () => {
        try {
            const response = await apiClient.get(INFOVEHICULO);
            setReportes(response.data);
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
    
                {reportes ? (
                    <div className="vehiculo-tickets">
                        <h1>Kilometros recorridos por litros consumidos</h1>
                        <div className="table-container">
                            <table className="consumo-promedio">
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Km recorridos</th>
                                        <th>Consumo total</th>
                                        <th>Km por litro consumido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {[...reportes]
                                            .sort((a, b) => b.kmPromedio - a.kmPromedio)
                                            .map((reportes) => (
                                        <tr key={reportes.patente}>
                                            <td>{reportes.patente}</td>
                                            <td>{reportes.marca}</td>
                                            <td>{reportes.modelo}</td>
                                            <td>{reportes.km}</td>
                                            <td>{reportes.consumo}</td>
                                            <td>{reportes.kmPromedio.toFixed(2)}</td>  
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
