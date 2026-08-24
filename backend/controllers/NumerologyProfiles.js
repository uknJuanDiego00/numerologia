import numerologyProfiles from "../models/NumerologyProfiles.js";
import Users from "../models/Users.js";


export const calculate = async (req, res) => {
    try {
        const { nombre, fecha_nacimiento } = req.body;

        if (!nombre || !fecha_nacimiento) {
            return res.status(400).json({
                message: "El nombre y la fecha de nacimiento son obligatorios."
            });
        }

        const profile = {
            nombre,
            fecha_nacimiento
        };

        return res.status(201).json({
            message: "Perfil numerológico calculado correctamente.",
            profile
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al calcular el perfil numerológico.",
            error: error.message
        });
    }
};

export const profile = async (req, res) => {
    try {

        const profile = {};

        return res.status(200).json({
            message: "Perfil obtenido correctamente.",
            profile
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el perfil numerológico.",
            error: error.message
        });
    }
};