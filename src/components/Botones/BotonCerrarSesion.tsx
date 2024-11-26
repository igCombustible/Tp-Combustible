import React from "react"
import { Link, useNavigate } from "react-router-dom"

export const BotonCerrarSesion = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Rol");
    navigate("/login");
  };
    return(
        <>
          <button className="logout-botton" onClick={handleLogout}>
            <i className="bi bi-box-arrow-in-left"></i>
          </button>
        
        </>
        
    )
}