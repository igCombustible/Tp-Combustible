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
import { ObtenerUsuarios } from './components/Usuarios/ObtenerUsuarios';
import { ConsumoVehiculos } from './components/Reportes/ConsumoVehiculos';
import { ConsumoPorKm } from './components/Reportes/ConsumoPorKm';
import { ListaUsuariosAceptados } from './components/Usuarios/ListaUsuariosAceptados';
import { UsuariosAceptados } from './components/Usuarios/UsuariosAceptados';
import { ListaUsuariosALaEspera } from './components/Usuarios/ListaUsuariosALaEspera';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/infoVehiculo/:patente" element={<InfoVehiculo />} />
          <Route path="/agregarTicket" element={<AgregarTicket />} /> 
          <Route path="/vehiculos-por-consumo" element={<ConsumoVehiculos />} />
          <Route path="/vehiculos-por-promedio-km" element={<ConsumoPorKm />} />
          <Route path="/usuarios" element={<ObtenerUsuarios  />} />

          <Route element={<RutaPrivada roles={['ADMIN']} />}>
            <Route path="/crearVehiculo" element={<AgregarVehiculo />} />
            <Route path="/editarVehiculo/:patente" element={<EditarVehiculo />} />
            <Route path="/eliminarVehiculo/:patente" element={<EliminarVehiculo />} />
          </Route>
          
          <Route element={<RutaPrivada roles={['OPERADOR']} />}>
            <Route path="/ticketsEsperando" element={<ListaTicketsALaEspera />} />
            <Route path="/usuariosEsperando" element={<ListaUsuariosALaEspera />} />
            <Route path="/UsuariosAceptados" element={<UsuariosAceptados />} />
            

          </Route>

          <Route element={<RutaPrivada />}>
            <Route path="/home" element={<Home />} /> 
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
