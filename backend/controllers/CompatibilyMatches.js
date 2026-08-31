import CompatibilityMatch from "../models/CompatibilyMatches.js";
import User from "../models/Users.js";

// Registrar un nuevo análisis de compatibilidad entre dos usuarios
export const crearCompatibilidad = async (req, res) => {
    try {
        const { usuario_1, usuario_2, puntaje, interpretacion } = req.body;

        if (!usuario_1 || !usuario_2 || puntaje === undefined || !interpretacion) {
            return res.status(400).json({
                message: "Los campos usuario_1, usuario_2, puntaje e interpretacion son obligatorios."
            });
        }

        if (usuario_1 === usuario_2) {
            return res.status(400).json({
                message: "No se puede realizar un análisis de compatibilidad de un usuario consigo mismo."
            });
        }

        // Verificar existencia de ambos usuarios
        const user1Existe = await User.findById(usuario_1);
        const user2Existe = await User.findById(usuario_2);

        if (!user1Existe || !user2Existe) {
            return res.status(404).json({
                message: "Uno o ambos usuarios especificados no existen."
            });
        }

        const nuevaCompatibilidad = await CompatibilityMatch.create({
            usuario_1,
            usuario_2,
            puntaje,
            interpretacion
        });

        return res.status(201).json({
            message: "Análisis de compatibilidad guardado exitosamente.",
            compatibilidad: nuevaCompatibilidad
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar la compatibilidad.",
            error: error.message
        });
    }
};

// Obtener historial de compatibilidades (opcionalmente filtrado por usuario)
export const obtenerCompatividades = async (req, res) => {
    try {
        const { usuario } = req.query;
        const filtro = usuario ? {
            $or: [{ usuario_1: usuario }, { usuario_2: usuario }]
        } : {};

        const resultados = await CompatibilityMatch.find(filtro)
            .populate("usuario_1", "nombre_completo email")
            .populate("usuario_2", "nombre_completo email")
            .sort({ createdAt: -1 });

        return res.status(200).json(resultados);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las compatibilidades.",
            error: error.message
        });
    }
};

// Obtener un análisis de compatibilidad específico por ID
export const obtenerCompatibilidadPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const compatibilidad = await CompatibilityMatch.findById(id)
            .populate("usuario_1", "nombre_completo email")
            .populate("usuario_2", "nombre_completo email");

        if (!compatibilidad) {
            return res.status(404).json({
                message: "Análisis de compatibilidad no encontrado."
            });
        }

        return res.status(200).json(compatibilidad);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el análisis de compatibilidad.",
            error: error.message
        });
    }
};

// Eliminar un análisis de compatibilidad por ID
export const eliminarCompatibilidad = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminada = await CompatibilityMatch.findByIdAndDelete(id);

        if (!eliminada) {
            return res.status(404).json({
                message: "Análisis de compatibilidad no encontrado para eliminar."
            });
        }

        return res.status(200).json({
            message: "Análisis de compatibilidad eliminado correctamente."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la compatibilidad.",
            error: error.message
        });
    }
};
