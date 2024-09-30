import React from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="email" placeholder="Correo Electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
};

export default Registro;