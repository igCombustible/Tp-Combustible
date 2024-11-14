import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface RutaPrivadaProps {
  roles?: string[];  
}

export const RutaPrivada: React.FC<RutaPrivadaProps> = ({ roles }) => {
  const token = sessionStorage.getItem('Token');
  const rolesAlmacenados = JSON.parse(sessionStorage.getItem('Rol') || '[]');

  if (roles && !roles.some(role => rolesAlmacenados.includes(role))) {
    return <Navigate to="/login" />; 
  }
  return <Outlet />;
};

