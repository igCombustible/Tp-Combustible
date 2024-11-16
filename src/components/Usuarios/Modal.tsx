import React from 'react';

export const Modal = ({ usuario, roles, onAsignar, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Asignar Rol a {usuario.name}</h3>
                <div>
                    {roles.map((rol, index) => (
                        <button 
                            key={index}
                            onClick={() => onAsignar(rol)}
                            className="modal-button"
                        >
                            {rol}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="modal-close-button">Cerrar</button>
            </div>
        </div>
    );
};
