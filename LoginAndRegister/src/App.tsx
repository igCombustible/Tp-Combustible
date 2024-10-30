import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Registro from './components/Registro';
import { Home } from './components/Home';
import { AgregarVehiculo } from './components/AgregarVehiculo';
import { EditarVehiculo } from './components/EditarVehiculo';
import { EliminarVehiculo } from './components/EliminarVehiculo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/Home" element={<Home />} /> 
          <Route path="/vehiculo/agregarVehiculo" element={<AgregarVehiculo />} />
          <Route path="/vehiculo/editarVehiculo/:patente" element={<EditarVehiculo />} />
          <Route path="/vehiculo/eliminarVehiculo/:patente" element={<EliminarVehiculo />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
