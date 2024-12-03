import { Ticket } from "./Ticket";

export type InformacionVehiculo = {
    marca: string;
    modelo: string;
    patente: string;
    consumo: number;
    km: number;
    tickets: Ticket[];
  }