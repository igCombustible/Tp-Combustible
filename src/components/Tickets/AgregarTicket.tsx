import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
import '../Botones/Boton.css';
import { VehiculoSelect } from '../Vehiculo/VehiculoSelect';
import { TicketForm } from './TicketForm';
import { Vehiculo } from "../../modelo/Vehiculo";
import { EstadoDelTicket } from '../../modelo/EstadoTicket';

const AGREGAR_TICKET = '/ticket';

export const AgregarTicket = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [error, setError] = useState<string>('');
    const [suceso, setSuceso] = useState<boolean>(false);

    if (!authContext) {
        throw new Error('El contexto de autenticación no está disponible.');
    }

    const { user } = authContext.auth;

    useEffect(() => {
        const obtenerVehiculos = async () => {
            try {
                const response = await apiClient.get('/vehiculo');
                setVehiculos(response.data);
            } catch (err) {
                setError('Error al obtener los vehículos');
            }
        };
        obtenerVehiculos();
    }, []);

    const handleSubmit = async (patente: string, cantidad: number) => {
        if (!patente || cantidad <= 0) {
            setError('Por favor, selecciona un vehículo y una cantidad válida');
            return;
        }
        try {
            await apiClient.post(AGREGAR_TICKET, {
                userName: user,  
                patente: patente, 
                ticket: {
                    cantidadDeSolicitud: cantidad, 
                    fechaDeSolicitud: new Date().toISOString(),
                    estado: EstadoDelTicket.ESPERANDO
                }
            });
            setSuceso(true);
        } catch (err) {
            setError('Error al crear el ticket');
        }
    };

    const cancelarOperacion = () => {
        navigate('/Home');
    };

    return (
        <>
            <Nav />
            {suceso ? (
                <div>
                    <p>El ticket se ha sido cargado exitosamente.</p>
                    <p>Debe esperar a confirmacion del operador</p>
                    <button onClick={() => navigate('/home')}>Home</button>
                </div>
            ) : (
                <TicketForm
                    vehiculos={vehiculos}
                    onSubmit={handleSubmit}
                    onCancel={cancelarOperacion}
                    error={error}
                />
            )}
        </>
    );
};