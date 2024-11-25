import { EstadoDelTicket } from "./EstadoTicket";
import { EstadoUsuario } from "./EstadoUsuario";

export type Usuario = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    estado : EstadoUsuario;
}