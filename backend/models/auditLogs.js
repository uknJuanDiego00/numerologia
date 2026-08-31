import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: false
    },
    accion: {
        type: String,
        required: true
    },
    detalles: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ip: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.model("AuditLog", auditLogSchema);