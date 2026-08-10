import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre_completo:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    fecha_nacimiento:{
        type:Date,
        required:true,
    },
}, {timestamps: true});

export default mongoose.model("Usuario", userSchema)