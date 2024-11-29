import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiService';
import './FormsRestablecerContrasenia.css';

export const VerificarCodigo = () => {
  const { email } = useParams(); 
  const [codigo, setCodigo] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const VERIFICARCODIGO = '/usuario/verificar-codigo';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCargando(true);

    if (!codigo.trim()) {
      alert('Por favor ingrese un codigo valido');
      return;
    }

    try {
      await apiClient.post(VERIFICARCODIGO, { email, codigo });
      navigate(`/nueva-contrasenia/${email}`);
    } catch (error) {
      console.error('Error al verificar el codigo:', error);
      alert('Codigo invalido o error en el servidor.');
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">Verificar Codigo de Verificacion</div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="codigo">Codigo de Verificacion</label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingrese el codigo de verificacion"
            required
          />
        </div>

        <button className="form-submit-btn" type="submit" disabled={cargando}>
          {cargando ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
};
