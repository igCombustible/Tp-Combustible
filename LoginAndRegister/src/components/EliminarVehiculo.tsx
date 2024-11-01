import apiClient from '../api/apiService';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import {Nav} from './Navbar';

export const EliminarVehiculo = () => {
    const authContext = useContext(AuthContext);
    const { patente } = useParams<{ patente: string }>(); 
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error('No se encontró el contexto de autenticación');
    }

    const { auth } = authContext;
    const ELIMINAR_VEHICULO = `/vehiculo/${patente}`; 

    const handleDelete = async () => {
        try {
            await apiClient.delete(ELIMINAR_VEHICULO);
            navigate('/Home');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('El servicio no responde');
            } else if (err.response?.status === 404) {
                setErrMsg('El vehículo no se encontró');
            } else {
                setErrMsg('Error al eliminar el vehículo');
            }
        }
    };

    return (
        <>
            <Nav />
            <div className="container mt-5">
                <h2>Eliminar Vehículo</h2>
                {errMsg && <p className="alert alert-danger">{errMsg}</p>}
                <p>¿Estás seguro de que deseas eliminar el vehículo con patente {patente}?</p>
                <button onClick={handleDelete} className="btn btn-danger">Confirmar Eliminación</button>
                <button onClick={() => navigate('/home')} className="btn btn-secondary ms-2">Cancelar</button>
            </div>
        </>
    );
};
