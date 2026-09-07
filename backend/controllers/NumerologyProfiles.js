import numerologyProfiles from "../models/NumerologyProfiles.js";
import Users from "../models/Users.js";

export const calcular = async (req, res) => {
    try {
        const { nombre, fecha_nacimiento } = req.body;

        if (!nombre || !fecha_nacimiento) {
            return res.status(400).json({
                message: "El nombre y la fecha de nacimiento son obligatorios."
            });
        }

        const user = await Users.findOne({name: nombre})

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe."
            });
        }

        // Crear y guardar el perfil numerológico
        const perfil = await numerologyProfiles.create({
            nombre,
            fecha_nacimiento,
            user: user._id
        });

        return res.status(201).json({
            message: "Perfil numerológico calculado correctamente.",
            perfil
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al calcular el perfil numerológico.",
            error: error.message
        });
    }
};

export const perfil = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                message: "El nombre es obligatorio."
            });
        }

        // Buscar el usuario
        const user = await Users.findOne({ name: nombre });

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe."
            });
        }

        // Buscar el perfil numerológico asociado al usuario
        const perfil = await numerologyProfiles.findOne({
            user: user._id
        });

        if (!perfil) {
            return res.status(404).json({
                message: "No se encontró un perfil numerológico para este usuario."
            });
        }

        return res.status(200).json({
            message: "Perfil obtenido correctamente.",
            perfil
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el perfil numerológico.",
            error: error.message
        });
    }
};