import AuditLog from "../models/auditLogs.js";


export const crearLog = async (req, res) => {
    try {
        const { usuario, accion, detalles } = req.body;
        const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        if (!accion) {
            return res.status(400).json({
                message: "La acción es obligatoria para registrar un log de auditoría."
            });
        }

        const nuevoLog = await AuditLog.create({
            usuario,
            accion,
            detalles: detalles || {},
            ip
        });

        return res.status(201).json({
            message: "Registro de auditoría guardado exitosamente.",
            log: nuevoLog
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al guardar el registro de auditoría.",
            error: error.message
        });
    }
};

export const obtenerLogs = async (req, res) => {
    try {
        const { usuario, accion } = req.query;
        const filtro = {};

        if (usuario) filtro.usuario = usuario;
        if (accion) filtro.accion = accion;

        const logs = await AuditLog.find(filtro)
            .populate("usuario", "nombre_completo email")
            .sort({ createdAt: -1 });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los registros de auditoría.",
            error: error.message
        });
    }
};


export const obtenerLogPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await AuditLog.findById(id).populate("usuario", "nombre_completo email");

        if (!log) {
            return res.status(404).json({
                message: "Registro de auditoría no encontrado."
            });
        }

        return res.status(200).json(log);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el registro de auditoría.",
            error: error.message
        });
    }
};
