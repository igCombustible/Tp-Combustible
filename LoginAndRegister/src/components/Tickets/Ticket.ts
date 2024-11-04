type Ticket = {
    id: string;
    cantidadDeSolicitud: number;
    fechaDeSolicitud: string;
    usuario: Usuario;
    vehiculo: Vehiculo;
    estado: EstadoDelTicket;
}