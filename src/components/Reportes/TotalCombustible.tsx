import React, { useEffect } from "react";
import apiClient from "../../api/apiService";

interface TotalCombustibleProps {
    setCombustible: (value: number | null) => void;
}

export const TotalCombustible: React.FC<TotalCombustibleProps> = ({ setCombustible }) => {
    const TOTAL_COMBUSTIBLE = "vehiculo/total-combustible";

    useEffect(() => {
        obtenerTotalCombustible();
    }, []);

    const obtenerTotalCombustible = async () => {
        try {
            const response = await apiClient.get(TOTAL_COMBUSTIBLE);
            setCombustible(response.data);
        } catch {
            setCombustible(null); 
        }
    };

    return null; 
};

