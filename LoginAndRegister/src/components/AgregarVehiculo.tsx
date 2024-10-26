import axios from '../api/axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Nav from './Navbar';


export const AgregarVehiculo = () => {
  
    const authContext = useContext(AuthContext)

    const [marca, setMarca] = useState<string>(''); 
    const [modelo, setModelo] = useState<string>('');
    const [patente, setPatente] = useState<string>('');

    const [errMsg, setErrMsg] = useState<string>('');

    if (!authContext){
      throw new Error('asdasd');
    }
    const {auth,setAuth} = authContext;
    const AGREGARVEHICULO = '/auth/vehiculo/agregarVehiculo';
    const navigate = useNavigate();

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(AGREGARVEHICULO, 
            JSON.stringify({    patente: patente,
                                marca: marca, 
                                modelo: modelo, 
                                ultimoValorConocidoKm: 0, 
                                estado_vehiculo: false }),
            { headers: { 
              'Authorization': `Bearer ${auth.accessToken}`, 
              'Content-Type': 'application/json' 
            }, withCredentials: true});
        } catch (err: any) {
            
            if (!err?.response) {
                setErrMsg('El servicio no responde');
            } else if (err.response?.status === 409) {
                setErrMsg('Usuario ya tomado');
            } else {
                setErrMsg('Registro fallido');
        }
      }

        // Después de agregar el vehículo, redirigir al Home
        navigate('/Home');
    };

    return (
    <>
    <Nav />
    <div className="container mt-5">
      <h2>Agregar Vehiculo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">Marca:</label>
          <input
            type="text"
            className="form-control"
            id="marca"
            name="marca"
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">Modelo:</label>
          <input
            type="text"
            className="form-control"
            id="modelo"
            name="modelo"
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">Patente:</label>
          <input
            type="text"
            className="form-control"
            id="patente"
            name="patente"
            onChange={(e) => setPatente(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">+</button>
      </form>
    </div>
    </>
  );
};