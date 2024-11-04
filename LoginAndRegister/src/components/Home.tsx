import "../assets/css/Home.css"; 
import React from 'react';
import {Nav} from './Navbar'
import { ListarVehiculo } from "./vehiculo/ListarVehiculo";

export const Home = () => {
  
    return (
        
        <div>
            <Nav /> 
                <ListarVehiculo /> 
        </div>
    );
};
