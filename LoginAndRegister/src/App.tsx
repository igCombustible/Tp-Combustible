import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Registro from './components/Registro';
import { Home } from './components/Home';
import { AgregarVehiculo } from './components/AgregarVehiculo';
import { EditarVehiculo } from './components/EditarVehiculo';
import { EliminarVehiculo } from './components/EliminarVehiculo';
import { RutaPrivada } from './components/RutaPrivada/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 

          <Route element={<RutaPrivada roles={['ADMIN']} />}>
            <Route path="/vehiculo" element={<AgregarVehiculo />} />
            <Route path="/vehiculo/:patente" element={<EditarVehiculo />} />
            <Route path="/vehiculo/:patente" element={<EliminarVehiculo />} />
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
