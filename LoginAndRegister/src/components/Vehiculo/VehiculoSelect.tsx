import React from 'react';
import { Vehiculo } from '../../modelo/Vehiculo';

interface VehiculoSelectProps {
    vehiculos: Vehiculo[];
    selectedPatente: string;
    onChange: (value: string) => void;
}

export const VehiculoSelect: React.FC<VehiculoSelectProps> = ({ vehiculos, selectedPatente, onChange }) => {
    return (
        <div className="mb-3">
            <label htmlFor="vehiculo" className="form-label">Vehículo:</label>
            <select
                id="vehiculo"
                className="form-control"
                value={selectedPatente}
                onChange={(e) => onChange(e.target.value)}
                required
            >
                <option value="">Selecciona un vehículo</option>
                {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.patente} value={vehiculo.patente}>
                        {vehiculo.patente} - {vehiculo.marca} {vehiculo.modelo}
                    </option>
                ))}
            </select>
        </div>
    );
};


