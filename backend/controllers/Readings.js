import Reading from "../models/Readings.js";

// Crear una lectura
export const crearLectura = async (req, res) => {
    try {
        const { prompt, respuesta, tipo_lectura } = req.body;

        const lectura = new Reading({
            usuario: req.usuario._id || req.usuario.id,
            prompt,
            respuesta,
            tipo_lectura
        });

        await lectura.save();

        res.status(201).json({
            ok: true,
            mensaje: "Lectura creada correctamente",
            lectura
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al crear la lectura",
            error: error.message
        });
    }
};


// Obtener todas las lecturas del usuario autenticado
export const obtenerLecturas = async (req, res) => {
    try {
        const lecturas = await Reading.find({
            usuario: req.usuario._id || req.usuario.id
        }).sort({ fecha: -1 });

        res.status(200).json({
            ok: true,
            lecturas
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener las lecturas",
            error: error.message
        });
    }
};


// Obtener una lectura por ID
export const obtenerLecturaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const lectura = await Reading.findOne({
            _id: id,
            usuario: req.usuario._id || req.usuario.id
        });

        if (!lectura) {
            return res.status(404).json({
                ok: false,
                mensaje: "Lectura no encontrada"
            });
        }

        res.status(200).json({
            ok: true,
            lectura
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener la lectura",
            error: error.message
        });
    }
};


// Eliminar una lectura
export const eliminarLectura = async (req, res) => {
    try {
        const { id } = req.params;

        const lectura = await Reading.findOneAndDelete({
            _id: id,
            usuario: req.usuario._id || req.usuario.id
        });

        if (!lectura) {
            return res.status(404).json({
                ok: false,
                mensaje: "Lectura no encontrada"
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: "Lectura eliminada correctamente"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar la lectura",
            error: error.message
        });
    }
};
