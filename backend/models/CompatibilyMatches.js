import mongoose from "mongoose";

const compatibilityMatchesSchema = new mongoose.Schema({
    usuario_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    usuario_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    puntaje: {
        type: Number,
        required: true,
        min: [0, "El puntaje mínimo es 0"],
        max: [100, "El puntaje máximo es 100"]
    },
    interpretacion: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("CompatibilityMatch", compatibilityMatchesSchema);