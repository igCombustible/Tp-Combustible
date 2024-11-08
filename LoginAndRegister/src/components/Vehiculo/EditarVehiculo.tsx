import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import { Nav } from '../NavBar/Navbar';
import apiClient from '../../api/apiService';

export const EditarVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>(); 
    const [marca, setMarca] = useState<string>(''); 
    const [modelo, setModelo] = useState<string>('');
    const [ultimos_Km, setultimos_Km] = useState<string>('');
    const [estado_Vehiculo, setestado_Vehiculo] = useState<boolean>(false); // Estado para el checkbox
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
                const response = await apiClient.get(`/vehiculo/${patente}`);
                const vehiculo = response.data;
                setMarca(vehiculo.marca);
                setModelo(vehiculo.modelo);
                setultimos_Km(vehiculo.ultimoValorConocidoKm);
                setestado_Vehiculo(vehiculo.estado_vehiculo);
            } catch (error) {
                setErrMsg('No se pudo cargar los datos del vehículo');
            }
        };
        buscarVehiculo();
    }, [patente, auth.accessToken]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await apiClient.put(EDITAR_VEHICULO,
                JSON.stringify({
                    marca: marca,
                    modelo: modelo,
                    ultimoValorConocidoKm: ultimos_Km, 
                    estado_vehiculo: estado_Vehiculo,
                })
            );
            navigate('/home'); 
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
                            value={marca}
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
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ultimos_Km" className="form-label">Últimos kilómetros:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ultimos_Km"
                            name="ultimos_Km"
                            value={ultimos_Km}
                            onChange={(e) => setultimos_Km(e.target.value)}
                            required
                        />
                    </div>
                    <div className="checkbox-container" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={estado_Vehiculo}
                            onChange={(e) => setestado_Vehiculo(e.target.checked)}
                            id="estado_Vehiculo"
                            style={{ width: '15px', marginRight: '5px', verticalAlign: 'center' }}
                        />
                        <label htmlFor="estado_Vehiculo" className="checkbox-label" style={{ verticalAlign: 'middle' }}>
                            El vehículo está {estado_Vehiculo ? "habilitado" : "inhabilitado"}
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </form>
            </div>
        </>
    );
};

