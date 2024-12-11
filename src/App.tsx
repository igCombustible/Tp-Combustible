import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/RegistroYLogin/Login';
import Registro from './components/RegistroYLogin/Registro';
import { ListaTicketsALaEspera } from './components/Tickets/ListaTicketsALaEspera';
import { AgregarVehiculo } from './components/Vehiculo/AgregarVehiculo';
import { EditarVehiculo } from './components/Vehiculo/EditarVehiculo';
import { EliminarVehiculo } from './components/Vehiculo/EliminarVehiculo';
import { InfoVehiculo } from './components/Vehiculo/InfoVehiculo';
import { RutaPrivada } from './components/RutaPrivada/PrivateRoute';
import { Home } from './components/Home/Home';
import { AgregarTicket } from './components/Tickets/AgregarTicket';
import { ObtenerUsuarios } from './components/Usuarios/ObtenerUsuarios';
import { ConsumoVehiculos } from './components/Reportes/ConsumoVehiculos';
import { ConsumoPorKm } from './components/Reportes/ConsumoPorKm';
import { ReporteGeneral } from "./components/Reportes/ReporteGeneral";
import { RestablecerContrasenia } from './components/RestablecerContrasenia/RestablecerContrasenia';
import { VerificarCodigo } from './components/RestablecerContrasenia/VerificarCodigo';
import { NuevaContrasenia } from './components/RestablecerContrasenia/NuevaContrasenia';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/usuarios" element={<ObtenerUsuarios  />} />

          <Route path="/restablecer-contrasenia" element={<RestablecerContrasenia />} />
          <Route path="/verificar-codigo/:email" element={<VerificarCodigo />} />
          <Route path="/nueva-contrasenia/:email" element={<NuevaContrasenia />} />

          <Route path="/vehiculo/:patente/info" element={<InfoVehiculo />} />
          <Route path="/vehiculos/consumo" element={<ConsumoVehiculos />} />
          <Route path="/vehiculos/promedio-km" element={<ConsumoPorKm />} />
          <Route path="/reporte-general" element={<ReporteGeneral />} />
          <Route element={<RutaPrivada roles={['ADMIN']} />}>
            <Route path="/vehiculo/crear" element={<AgregarVehiculo />} />
            <Route path="/vehiculo/:patente/editar" element={<EditarVehiculo />} />
            <Route path="/vehiculo/:patente/eliminar" element={<EliminarVehiculo />} />
          </Route>
          
          <Route path="/ticket/:patente/agregar" element={<AgregarTicket />} /> 
          <Route element={<RutaPrivada roles={['OPERADOR']} />}>
            <Route path="/tickets/esperando" element={<ListaTicketsALaEspera />} />
          </Route>

          <Route element={<RutaPrivada />}>
            <Route path="/vehiculos" element={<Home />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
