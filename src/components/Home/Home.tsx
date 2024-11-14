import React from 'react';
import {Nav} from '../NavBar/Navbar'
import { ListarVehiculo } from "../vehiculo/ListarVehiculo";

export const Home = () => {
  
    return (
        
        <div>
            <Nav /> 
                <ListarVehiculo /> 
        </div>
    );
};
