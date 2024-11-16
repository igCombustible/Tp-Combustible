import React, { useContext } from "react";
import AuthContext from "./AuthProvider";


export const AuthStatus = () => {
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        return <p>No se ha iniciado sesión.</p>;                {/* verifico porque puede ser undefined */}
    }

    const {auth} = authContext;

    return (
        <>
        
            <div>
                <p>User: {auth.user}</p>
                <p>Roles: {auth.roles?.join(', ')}</p>
                <p>Access Token: {auth.accessToken}</p>
            </div>
        </>
    );
};