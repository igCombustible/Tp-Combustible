import React from "react"
import { Link } from "react-router-dom"

export const BotonAgregarTicket = () => {
    return(
        <>
        <Link to={`/agregarTicket`}>
            <button className="create-ticket-button" data-tooltip="Crear ticket">
                <i className="bi bi-ticket-perforated"></i>
            </button>
        </Link>
        </>
        
    )
}