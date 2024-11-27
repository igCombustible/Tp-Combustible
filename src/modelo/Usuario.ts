import { EstadoDelTicket } from "./EstadoTicket";
import { EstadoUsuario } from "./EstadoUsuario";
import { EstadoPassword } from "./EstadoPassword";

export type Usuario = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    estado : EstadoUsuario;
    estadoPassword : EstadoPassword; 
}