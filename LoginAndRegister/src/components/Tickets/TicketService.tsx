import apiClient from '../../api/apiService';
import { Ticket } from '../Tickets/Ticket';

const AGREGAR_TICKET_URL = '/ticket';

export const crearTicket = async (ticket: Ticket) => {
    const response = await apiClient.post(
        AGREGAR_TICKET_URL,
        JSON.stringify({
            cantidadDeSolicitud: ticket.cantidadDeSolicitud,
            fechaDeSolicitud: ticket.fechaDeSolicitud,
            estado: ticket.estado,
            vehiculo: { patente: ticket.vehiculo.patente },  
            usuario: { id: ticket.usuario.id }                
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};








