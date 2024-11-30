import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import { Nav } from '../NavBar/Navbar';
import apiClient from '../../api/apiService';
import { Vehiculo } from '../../modelo/Vehiculo';
import { BotonConfirmar } from '../Botones/BotonConfirmar';
import { BotonCancelar } from '../Botones/BotonCancelar';

export const EditarVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>();
    const [vehiculo, setVehiculo] = useState<Vehiculo>({
        marca: '',
        modelo: '',
        patente: '',
        ultimoValorConocidoKm: 0, 
        estado_vehiculo: false,
        deleted: false 
      });
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error('No se encontró el contexto de autenticación');
      }

    const { auth } = authContext;
    const EDITAR_VEHICULO = `/vehiculo/${patente}`; 
    
    useEffect(() => {
        const buscarVehiculo = async () => {
            try {
                const response = await apiClient.get(EDITAR_VEHICULO);
                const unVehiculo = response.data;
                setVehiculo(unVehiculo);
            } catch (error) {
                setErrMsg('No se pudo cargar los datos del vehículo');
            }
        };
        buscarVehiculo();
    }, [vehiculo.patente, auth.accessToken]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setVehiculo({
            ...vehiculo,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await apiClient.put(EDITAR_VEHICULO,
                JSON.stringify(vehiculo)
            );
            navigate('/vehiculos'); 
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('El servicio no responde');
            } else if (err.response?.status === 409) {
                setErrMsg('Ya existe un vehículo con esa patente');
            } else {
                setErrMsg('Actualización fallida');
            }
        }
    };

    return (
        <>
            <Nav />
            <div className="container mt-5">
                <h2>Editar Vehículo</h2>
                {errMsg && <p className="alert alert-danger">{errMsg}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="marca" className="form-label">Marca:</label>
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
                        <label htmlFor="modelo" className="form-label">Modelo:</label>
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
                        <label htmlFor="ultimos_Km" className="form-label">Últimos kilómetros:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ultimos_Km"
                            name="ultimoValorConocidoKm" 
                            value={vehiculo.ultimoValorConocidoKm}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="checkbox-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={vehiculo.estado_vehiculo}
                        onChange={handleChange}
                        id="estado_Vehiculo"
                        name="estado_vehiculo"
                        style={{ width: '15px', marginRight: '5px', verticalAlign: 'center' }}
                    />
                        <label htmlFor="estado_Vehiculo" className="checkbox-label" style={{ verticalAlign: 'middle' }}>
                            El vehículo está {vehiculo.estado_vehiculo ? "habilitado" : "inhabilitado"}
                        </label>
                    </div>
                    <BotonConfirmar funcion={handleSubmit} />
                    <BotonCancelar />
                </form>
            </div>
        </>
    );
};

