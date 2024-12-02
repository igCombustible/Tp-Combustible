import React, { useState } from 'react';
import { Vehiculo } from "../../modelo/Vehiculo";
import { BotonConfirmar } from '../Botones/BotonConfirmar';
import { BotonCancelar } from '../Botones/BotonCancelar';

interface TicketFormProps {
    vehiculo: Vehiculo; 
    onSubmit: (cantidad: number) => void;
    error: string;
}

export const TicketForm: React.FC<TicketFormProps> = ({ vehiculo, onSubmit, error }) => {
    const [cantidad, setCantidad] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(cantidad); 
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Ticket</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <p  className="form-label">Vehículo:</p>
                    <input
                        type="text"
                        id="vehiculo"
                        className="form-control"
                        value={`${vehiculo.patente} - ${vehiculo.modelo}`}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <p  className="form-label">Cantidad de solicitud:</p>
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
                <BotonConfirmar funcion={handleSubmit} />
                <BotonCancelar/>
            </form>
        </div>
    );
};
