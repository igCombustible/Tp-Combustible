import { useState, useEffect } from "react";
import apiClient from "../../api/apiService";
import { Vehiculo } from "../../modelo/Vehiculo";
import React from "react";
import { Nav } from "../NavBar/Navbar";

export const ConsumoPorKm = () => {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [promedio, setPromedios] = useState<{ [patente: string]: number | null }>({});

    const BUSCARVEHICULO = '/vehiculo';
    

    const [errMsgVehiculo, setErrMsgVehiculo] = useState<string | null>(null);
    const [errMsgTicket, setErrMsgTicket] = useState<string | null>(null);


    useEffect(() => {
        buscarVehiculos();
    }, []);

    useEffect(() => {
        vehiculos.forEach(vehiculo => {
            consumoPromedio(vehiculo.patente);
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

    const consumoPromedio = async (patente: string) => {
        const CONSUMOPROMEDIO = `ticket/consumoPromedioPorKm/${patente}`;
        try {
            const response = await apiClient.get(CONSUMOPROMEDIO);
            setPromedios(actualizacionPromedios => ({ ...actualizacionPromedios, [patente]: response.data.toFixed(2) }));
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
                        <h3>Kilometros recorridos por litros consumidos</h3>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patente</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Km recorridos</th>
                                        <th>Km por litro consumido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...vehiculos]
                                            .sort((a, b) => (promedio[b.patente] || 0) - (promedio[a.patente] || 0))
                                            .map((vehiculo) => (
                                        <tr key={vehiculo.patente}>
                                            <td>{vehiculo.patente}</td>
                                            <td>{vehiculo.marca}</td>
                                            <td>{vehiculo.modelo}</td>
                                            <td>{vehiculo.ultimoValorConocidoKm}</td> 
                                            <td>{promedio[vehiculo.patente] ?? "Cargando..."}</td>
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
