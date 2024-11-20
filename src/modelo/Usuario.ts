import { EstadoDelTicket } from "./EstadoTicket";

export type Usuario = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    estado : EstadoDelTicket;
}