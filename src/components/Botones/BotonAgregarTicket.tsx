import React from "react"
import { Link, useParams } from "react-router-dom"

export const BotonAgregarTicket = ({ patente }) => {
    return(
        <>
        <Link to={`/agregarTicket/${patente}`}>
            <button className="create-ticket-button" data-tooltip="Crear ticket">
                <i className="bi bi-ticket-perforated"></i>
            </button>
        </Link>
        </>
        
    )
}