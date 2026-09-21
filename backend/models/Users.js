import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        nombre_completo: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    
    fecha_nacimiento:{
        type:Date,
        required:true,
    },
}, {timestamps: true});

export default mongoose.model("Usuario", userSchema)