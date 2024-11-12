import React, { useContext, useEffect, useState } from "react";
import { Vehiculo } from "../../modelo/Vehiculo";
import apiClient from "../../api/apiService";
import { Nav } from "../NavBar/Navbar";

export const ConsumoVehiculos = () => {
    
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [consumos, setConsumos] = useState<{ [patente: string]: number | null }>({});

    const BUSCARVEHICULO = '/vehiculo';
    

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);


    useEffect(() => {
        buscarVehiculos();
    }, []);

    useEffect(() => {
        vehiculos.forEach(vehiculo => {
            consumoDelVehiculo(vehiculo.patente);
        });
    }, [vehiculos]);

    
    const buscarVehiculos = async () => {
        try {
            const response = await apiClient.get(BUSCARVEHICULO);
            setVehiculos(response.data);
        } catch (error) {
            setErrMsgVehiculo('No se pudo cargar los datos del vehículo');
        }
    };

    const consumoDelVehiculo = async (patente: string) => {
        const LITROSCONSUMIDOS = `ticket/consumoTotalCombustible/${patente}`;
        try {
            const response = await apiClient.get(LITROSCONSUMIDOS);
            setConsumos(actualizacionConsumos => ({ ...actualizacionConsumos, [patente]: response.data }));
            return(response.data);
        } catch (error) {
            setErrMsgTicket('Error al obtener el consumo de combustible');
        } 
    };

    return (
        <>
            <Nav />
            <div className="vehiculo-info">
                <h2>Información del Vehículo</h2>
    
                {errMsgVehiculo && <p className="error-message">{errMsgVehiculo}</p>}
                {errMsgTicket && <p className="error-message">{errMsgTicket}</p>}
    
                {vehiculos ? (
                    <div className="vehiculo-tickets">
                        <h3>Consumo por Vehículo</h3>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Consumo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...vehiculos]
                                            .sort((a, b) => (consumos[b.patente] || 0) - (consumos[a.patente] || 0))
                                            .map((vehiculo) => (
                                        <tr key={vehiculo.patente}>
                                            <td>{vehiculo.patente}</td>
                                            <td>{vehiculo.marca}</td>
                                            <td>{vehiculo.modelo}</td> 
                                            <td>{consumos[vehiculo.patente] ?? "Cargando..."}</td>
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

