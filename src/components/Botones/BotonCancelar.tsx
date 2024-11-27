import React from "react"
import { Link } from "react-router-dom"

export const BotonCancelar = () => {
    return(
        <>
        <Link to={'/Home'}>
        <button type="button" 
                className="btn btn-danger">
                    Cancelar
        </button>
        </Link>
        </>
    )
}
        
    