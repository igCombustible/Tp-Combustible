import React from "react"
import { Link } from "react-router-dom"

export const BotonVerInfo = ({patente}) => {
    return(
        <>
        <Link to={`/vehiculo/${patente}/info`}>
            <button className="info-button" data-tooltip="Ver Info">
                <i className="bi bi-info-square"></i>
            </button>
        </Link>
        </>
        
    )
}