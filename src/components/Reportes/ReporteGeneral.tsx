import React, { useState } from "react";
import { TotalVehiculos } from "./TotalVehiculos";
import { TotalKilometros } from "./TotalKilometros";
import { TotalCombustible } from "./TotalCombustible";
import { Nav } from "../NavBar/Navbar";
 import "./ReporteGeneral.css";


export const ReporteGeneral = () => {
    const [vehiculos, setVehiculos] = useState<number | null>(null);
    const [kilometros, setKilometros] = useState<number | null>(null);
    const [combustible, setCombustible] = useState<number | null>(null);

    return (
        <>
            <Nav />
            <div className="reporte-general">
                <h2>Reporte General</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Total Vehículos</th>
                            <th>Total Kilómetros</th>
                            <th>Total Consumo </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{vehiculos !== null ? vehiculos : "Cargando..."}</td>
                            <td>{kilometros !== null ? kilometros : "Cargando..."}</td>
                            <td>{combustible !== null ? combustible : "Cargando..."}</td>
                        </tr>
                    </tbody>
                </table>
                
                <TotalVehiculos setVehiculos={setVehiculos} />
                <TotalKilometros setKilometros={setKilometros} />
                <TotalCombustible setCombustible={setCombustible} />
            </div>
        </>
    );
}