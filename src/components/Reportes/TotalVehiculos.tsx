import React, { useEffect } from "react";
import apiClient from "../../api/apiService";

interface TotalVehiculosProps {
    setVehiculos: (value: number | null) => void;
}

export const TotalVehiculos: React.FC<TotalVehiculosProps> = ({ setVehiculos }) => {
    const TOTAL_VEHICULOS = "vehiculo/total-vehiculos";

    useEffect(() => {
        obtenerTotalVehiculos();
    }, []);

    const obtenerTotalVehiculos = async () => {
        try {
            const response = await apiClient.get(TOTAL_VEHICULOS);
            setVehiculos(response.data);
        } catch {
            setVehiculos(null); 
        }
    };

    return null; 
};
