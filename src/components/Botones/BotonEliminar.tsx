import React from "react"
import { Link } from "react-router-dom"

export const BotonEliminar = ({patente}) => {
    return(
        <>
        <Link to={`/vehiculo/${patente}/eliminar`}>
            <button className="delete-button" data-tooltip="Eliminar">
                <i className="bi bi-trash"></i>
            </button>
        </Link>
        </>
        
    )
}