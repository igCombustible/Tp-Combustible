import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Nav} from '../NavBar/Navbar';
import apiClient from '../../api/apiService';
import { Vehiculo} from '../../modelo/Vehiculo'
import { BotonConfirmar } from '../Botones/BotonConfirmar';
import { BotonCancelar } from '../Botones/BotonCancelar';


export const AgregarVehiculo = () => {

    const [vehiculo, setVehiculo] = useState<Vehiculo>({
      marca: '',
      modelo: '',
      patente: '',
      ultimoValorConocidoKm: 0, 
      estado_vehiculo: false,
      deleted: false 
    });
    const [suceso,setSuceso] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    const AGREGARVEHICULO = '/vehiculo';
    const navigate = useNavigate();

    const handleChange = (e) => {
      setVehiculo({
          ...vehiculo,
          [e.target.name]: e.target.value,
      });
    };
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await apiClient.post(AGREGARVEHICULO, 
                      JSON.stringify( vehiculo ))
            setSuceso(true);
        } catch (err: any) {
            
            if (!err?.response) {
                setErrMsg('El servicio no responde');
            } else if (err.response?.status === 409) {
                setErrMsg('Vehiculo con esa patente ya existe');
            } else {
                setErrMsg('Registro fallido');
        }
      } 
    };

    return (
    <>
    <Nav />
    {suceso ? (
    <div>
      <p>Se ha creado con exito el vehiculo</p>
      <p><Link to="/vehiculos">Ve al listado de vehiculos</Link></p>
    </div>
    ): (
    <div className="container mt-5">
      <h2>Agregar Vehiculo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="form-label">Marca:</p>
          <input
            type="text"
            className="form-control"
            id="marca"
            name="marca"
            value={vehiculo.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <p className="form-label">Modelo:</p>
          <input
            type="text"
            className="form-control"
            id="modelo"
            name="modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <p className="form-label">Patente:</p>
          <input
            type="text"
            className="form-control"
            id="patente"
            name="patente"
            value={vehiculo.patente}
            onChange={handleChange}
            required
          />
        </div>
        <BotonConfirmar funcion={handleSubmit} />
        <BotonCancelar />
      </form>
    </div> 
    )
    }
    </>
  );
};