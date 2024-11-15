import { useState, useEffect } from "react";
import apiClient from "../../api/apiService";
import { PromedioConsumo } from "../../modelo/PromedioConsumo";
import React from "react";
import { Nav } from "../NavBar/Navbar";
import "../../assets/css/ConsumoPorKm.css"

export const ConsumoPorKm = () => {
    const [promedios, setPromedios] = useState<PromedioConsumo[]>([]);

    const PROMEDIOSCONSUMO = '/vehiculo/promedios';
    

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);


    useEffect(() => {
        buscarPromedios();
    }, []);


    const buscarPromedios = async () => {
        try {
            const response = await apiClient.get(PROMEDIOSCONSUMO);
            setPromedios(response.data);
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
    
                {promedios ? (
                    <div className="vehiculo-tickets">
                        <h3>Kilometros recorridos por litros consumidos</h3>
                        <div className="table-container">
                            <table className="consumo-promedio">
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Km recorridos</th>
                                        <th>Consumo</th>
                                        <th>Km por litro consumido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {[...promedios]
                                            .sort((a, b) => b.kmPorLitroConsumido - a.kmPorLitroConsumido)
                                            .map((promedio) => (
                                        <tr key={promedio.patente}>
                                            <td>{promedio.patente}</td>
                                            <td>{promedio.marca}</td>
                                            <td>{promedio.modelo}</td>
                                            <td>{promedio.km}</td>
                                            <td>{promedio.consumo}</td>
                                            <td>{promedio.kmPorLitroConsumido}</td>  
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
