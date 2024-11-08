import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/RegistroYLogin/Login';
import Registro from './components/RegistroYLogin/Registro';
import { ListaTicketsALaEspera } from './components/Tickets/ListaTicketsALaEspera';
import { EditarVehiculo } from './components/Vehiculo/EditarVehiculo';
import { RutaPrivada } from './components/RutaPrivada/PrivateRoute';
import { Home } from './components/Home/Home';
import { EliminarVehiculo } from './components/Vehiculo/EliminarVehiculo';
import { AgregarVehiculo } from './components/Vehiculo/AgregarVehiculo';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 

          <Route element={<RutaPrivada roles={['ADMIN']} />}>
            <Route path="/crearVehiculo" element={<AgregarVehiculo />} />
            <Route path="/editarVehiculo/:patente" element={<EditarVehiculo />} />
            <Route path="/eliminarVehiculo/:patente" element={<EliminarVehiculo />} />
            <Route path="/ticketsEsperando" element={<ListaTicketsALaEspera />} /> 
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
