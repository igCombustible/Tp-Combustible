import { Vehiculo } from "./Vehiculo";
import { Usuario } from "./Usuario"
import { EstadoDelTicket } from "./EstadoTicket"

export type Ticket = {
    id: string;
    cantidadDeSolicitud: number;
    fechaDeSolicitud: string;
    usuario: Usuario;
    vehiculo: Vehiculo;
    estado: EstadoDelTicket;
}