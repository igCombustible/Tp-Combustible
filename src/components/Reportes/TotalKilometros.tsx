import React, { useEffect } from "react";
import apiClient from "../../api/apiService";

interface TotalKilometrosProps {
    setKilometros: (value: number | null) => void;
}

export const TotalKilometros: React.FC<TotalKilometrosProps> = ({ setKilometros }) => {
    const TOTAL_KILOMETROS = "vehiculo/total-kilometros";

    useEffect(() => {
        obtenerTotalKilometros();
    }, []);

    const obtenerTotalKilometros = async () => {
        try {
            const response = await apiClient.get(TOTAL_KILOMETROS);
            setKilometros(response.data);
        } catch {
            setKilometros(null); 
        }
    };

    return null;
};
