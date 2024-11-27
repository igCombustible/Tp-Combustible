import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiService';
import './FormsRestablecerContrasenia.css';

export const NuevaContrasenia = () => {
  const { email } = useParams();
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const navigate = useNavigate();

  const NUEVACONTRASENIA = '/usuario/restablecer-contrasenia';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await apiClient.post(
        NUEVACONTRASENIA,
        {email, nuevaContrasenia}
      )

    if (response.status === 200) {
      navigate('/login');
    } else {
      alert('Error al restablecer la contrasenia');
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">Ingresar Nueva Contraseña</div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nuevaContrasenia">Nueva Contraseña</label>
          <input
            type="password"
            id="nuevaContrasenia"
            name="nuevaContrasenia"
            value={nuevaContrasenia}
            onChange={(e) => setNuevaContrasenia(e.target.value)}
            placeholder="Ingrese su nueva contraseña"
            required
          />
        </div>

        <button className="form-submit-btn" type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

