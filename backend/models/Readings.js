import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    prompt: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: true
    },
    tipo_lectura: {
        type: String,
        required: true,
        enum: {
            values: ["diaria", "general", "anual"],
            message: '{VALUE} no es un tipo de lectura válido'
        }
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Reading", readingSchema);
