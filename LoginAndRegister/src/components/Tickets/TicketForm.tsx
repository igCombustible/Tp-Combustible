import React, { useState } from 'react';
import { Vehiculo } from "../../modelo/Vehiculo";
import { VehiculoSelect } from '../Vehiculo/VehiculoSelect';

interface TicketFormProps {
    vehiculos: Vehiculo[];
    onSubmit: (patente: string, cantidad: number) => void;
    onCancel: () => void;
    error: string;
}

export const TicketForm: React.FC<TicketFormProps> = ({ vehiculos, onSubmit, onCancel, error }) => {
    const [patenteSeleccionada, setPatenteSeleccionada] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(patenteSeleccionada, cantidad);
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Ticket</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <VehiculoSelect
                    vehiculos={vehiculos}
                    selectedPatente={patenteSeleccionada}
                    onChange={setPatenteSeleccionada}
                />
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad de solicitud:</label>
                    <input
                        type="number"
                        id="cantidad"
                        className="form-control"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirmar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};
