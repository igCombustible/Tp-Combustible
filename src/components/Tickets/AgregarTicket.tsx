import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
import { TicketForm } from './TicketForm';
import { EstadoDelTicket } from '../../modelo/EstadoTicket';
import { Vehiculo } from '../../modelo/Vehiculo';

const AGREGAR_TICKET = '/ticket';

export const AgregarTicket = () => {
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [error, setError] = useState('');
    const [suceso, setSuceso] = useState(false);
    const { patente } = useParams();


    if (!authContext) {
        throw new Error('El contexto de autenticación no está disponible.');
    }

    const { user } = authContext.auth;

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const { data } = await apiClient.get(`/vehiculo/${patente}`);
                setVehiculo(data);
            } catch {
                setError('Error al obtener el vehículo');
            }
        };

        if (patente) fetchVehiculo();
    }, [patente]);

    const handleSubmit = async (cantidad: number) => {
        if (!vehiculo || cantidad <= 0) return setError('Por favor, selecciona un vehículo y una cantidad válida');

        try {
            await apiClient.post(AGREGAR_TICKET, {
                userName: user,
                patente: vehiculo.patente,
                ticket: { 
                    cantidadDeSolicitud: cantidad, 
                    fechaDeSolicitud: new Date().toISOString(), 
                    estado: EstadoDelTicket.ESPERANDO }
            });
            setSuceso(true);
        } catch {
            setError('Error al crear el ticket');
        }
    };

    return (
        <>
            <Nav />
            {suceso ? (
                <div>
                    <p>El ticket se ha cargado exitosamente.</p>
                    <button onClick={() => navigate('/vehiculos')}>Home</button>
                </div>
            ) : (
                vehiculo && <TicketForm vehiculo={vehiculo} onSubmit={handleSubmit} error={error} />
            )}
        </>
    );
};
