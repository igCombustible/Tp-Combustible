import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiService';
import './FormsRestablecerContrasenia.css';

export const RestablecerContrasenia = () => {
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const SOLICITARCODIGO = '/usuario/solicitar-codigo';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCargando(true);

    try {
      const response = await apiClient.post(
        SOLICITARCODIGO,
        {email}
      );

      if (response.status === 200) {
        navigate(`/verificar-codigo/${email}`);
      } else {
        alert('Error al enviar el codigo. Intentalo de nuevo.');
      }
    } catch (error) {
      alert('Error al contactar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">Has olvidado tu contraseña</div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Ingresa tu email" 
            required />
        </div>

        <button className="form-submit-btn" type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar Codigo'}
        </button>
      </form>

      <p className="signup-link">
        ¿No tienes una cuenta?
        <Link to="/registro" className="signup-link link"> Registrate ahora</Link>
      </p>
    </div>
  );
};
