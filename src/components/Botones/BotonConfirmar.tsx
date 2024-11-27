import React from "react"

export const BotonConfirmar= ({funcion}) => {
    return(
        <>
        <button type="button" 
                className="btn btn-primary"
                onClick={funcion}>
                    Confirmar
        </button>
        </>
    )
}