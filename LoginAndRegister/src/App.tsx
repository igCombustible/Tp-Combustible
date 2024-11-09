import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/RegistroYLogin/Login';
import Registro from './components/RegistroYLogin/Registro';
import { ListaTicketsALaEspera } from './components/Tickets/ListaTicketsALaEspera';
import { AgregarVehiculo } from './components/vehiculo/AgregarVehiculo';
import { EditarVehiculo } from './components/vehiculo/EditarVehiculo';
import { EliminarVehiculo } from './components/vehiculo/EliminarVehiculo';
import { InfoVehiculo } from './components/Vehiculo/InfoVehiculo';
import { RutaPrivada } from './components/RutaPrivada/PrivateRoute';
import { Home } from './components/Home/Home';
import { AgregarTicket } from './components/Tickets/AgregarTicket';   
import {ListaTickets} from './components/Tickets/ListaTickets';  

 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/infoVehiculo/:patente" element={<InfoVehiculo />} /> 

          <Route element={<RutaPrivada roles={['ADMIN']} />}>
            <Route path="/crearVehiculo" element={<AgregarVehiculo />} />
            <Route path="/editarVehiculo/:patente" element={<EditarVehiculo />} />
            <Route path="/eliminarVehiculo/:patente" element={<EliminarVehiculo />} />
            <Route path="/ticketsEsperando" element={<ListaTicketsALaEspera />} />

         </Route>{/* <Route path="/confirmarTicket/:id" element={<ConfirmarTickets />} />  */}

          <Route element={<RutaPrivada />}>
            <Route path="/home" element={<Home />} /> 
          </Route>
          
          <Route element={<RutaPrivada />}>
            <Route path="/home" element={<Home />} />
            <Route path="/agregarTicket" element={<AgregarTicket />} />
            <Route path="/listaTickets" element={<ListaTickets />} />   
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

