import Reading from "../models/Readings.js";

// Crear una nueva lectura (historial de interpretación de Gemini)
export const crearLectura = async (req, res) => {
    try {
        const { usuario, prompt, respuesta, tipo_lectura, fecha } = req.body;

        if (!prompt || !respuesta || !tipo_lectura) {
            return res.status(400).json({
                message: "Los campos prompt, respuesta y tipo_lectura son obligatorios."
            });
        }

        const nuevaLectura = await Reading.create({
            usuario,
            prompt,
            respuesta,
            tipo_lectura,
            fecha: fecha || Date.now()
        });

        return res.status(201).json({
            message: "Lectura guardada exitosamente.",
            lectura: nuevaLectura
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al guardar la lectura.",
            error: error.message
        });
    }
};

// Obtener todas las lecturas (opcionalmente filtradas por usuario)
export const obtenerLecturas = async (req, res) => {
    try {
        const { usuario } = req.query;
        const filtro = usuario ? { usuario } : {};

        const lecturas = await Reading.find(filtro)
            .populate("usuario", "nombre_completo email")
            .sort({ fecha: -1 });

        return res.status(200).json(lecturas);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las lecturas.",
            error: error.message
        });
    }
};

// Obtener una lectura por su ID
export const obtenerLecturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const lectura = await Reading.findById(id).populate("usuario", "nombre_completo email");

        if (!lectura) {
            return res.status(404).json({
                message: "Lectura no encontrada."
            });
        }

        return res.status(200).json(lectura);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la lectura.",
            error: error.message
        });
    }
};

// Eliminar una lectura por su ID
export const eliminarLectura = async (req, res) => {
    try {
        const { id } = req.params;
        const lecturaEliminada = await Reading.findByIdAndDelete(id);

        if (!lecturaEliminada) {
            return res.status(404).json({
                message: "Lectura no encontrada para eliminar."
            });
        }

        return res.status(200).json({
            message: "Lectura eliminada correctamente."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la lectura.",
            error: error.message
        });
    }
};
