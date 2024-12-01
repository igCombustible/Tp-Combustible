import React from "react"
import { Link } from "react-router-dom"

export const BotonEditar = ({patente}) => {
    return(
        <>
        <Link to={`/vehiculo/${patente}/editar`}>
            <button className="edit-button" data-tooltip="Editar">
                <i className="bi bi-pencil-square"></i>
            </button>
        </Link>
        </>
        
    )
}