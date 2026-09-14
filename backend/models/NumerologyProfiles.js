import mongoose from "mongoose";

const numProfilesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    numero_vida: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        }
    },
    numero_expresion: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        }
    },
    numero_alma: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        }
    },
    interpretacion: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Perfil", numProfilesSchema);