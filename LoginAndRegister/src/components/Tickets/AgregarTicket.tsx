import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import apiClient from '../../api/apiService';
import { Nav } from "../NavBar/Navbar";
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
                    estado: 'ESPERANDO'
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











//-------------------------------------------------------------

/*import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider'; // Importa el contexto
import apiClient from '../../api/apiService';
import { Nav } from '../Navbar';

type Vehiculo = {
    patente: string;
    marca: string;
    modelo: string;
};

export const AgregarTicket = () => {
    const authContext = useContext(AuthContext); // Obtén el contexto de autenticación
    const navigate = useNavigate();

    // Estado de vehículos, patente seleccionada, cantidad, error y éxito
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [patenteSeleccionada, setPatenteSeleccionada] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [suceso, setSuceso] = useState<boolean>(false);
    const AGREGAR_TICKET = '/ticket';

    // Verifica si el contexto de autenticación está disponible
    if (!authContext) {
        throw new Error('El contexto de autenticación no está disponible.');
    }

    const { user } = authContext.auth;  // Accede al usuario desde el contexto

    // Obtener lista de vehículos
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar que la patente y la cantidad sean válidas
        if (!patenteSeleccionada || cantidad <= 0) {
            setError('Por favor, selecciona un vehículo y una cantidad válida');
            return;
        }

        try {
            // Enviar el ticket al servidor
            await apiClient.post(AGREGAR_TICKET, {
                vehiculo: { patente: patenteSeleccionada },
                cantidadDeSolicitud: cantidad,
                fechaDeSolicitud: new Date().toISOString(),
                estado: 'PENDIENTE',
                userName: user, // Se usa el userName del contexto
            });
            setSuceso(true);  // Indica éxito
        } catch (err: any) {
            setError('Error al crear el ticket');
        }
    };

    const cancelarOperacion = () => {
        navigate('/Home');  // Navegar a la página principal
    };

    return (
        <>
            <Nav />
            {suceso ? (
                <div>
                    <p>El ticket se ha creado exitosamente.</p>
                    <button onClick={() => navigate('/Home')}>Ver lista de tickets</button>
                </div>
            ) : (
                <div className="container mt-5">
                    <h2>Agregar Ticket</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="vehiculo" className="form-label">Vehículo:</label>
                            <select
                                id="vehiculo"
                                className="form-control"
                                value={patenteSeleccionada}
                                onChange={(e) => setPatenteSeleccionada(e.target.value)}
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
                        <button type="button" className="btn btn-secondary" onClick={cancelarOperacion}>Cancelar</button>
                    </form>
                </div>
            )}
        </>
    );
}; */
