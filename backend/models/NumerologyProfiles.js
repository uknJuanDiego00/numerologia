import mongoose from "mongoose";

const numProfilesSchema = new mongoose.Schema({
numero_vida: {
    type: Number,
    required: true,
    validate:{
        validator: Number.isInteger,
        message: '{VALUE} debe ser un número entero'
    }
},
numero_expresion:{
    type: Number,
    required: true,
    validate:{
        validator: Number.isInteger,
        message: '{VALUE} debe ser un número entero'
    }
},

numero_alma:{
    type: Number,
    required: true,
    validate:{
        validator: Number.isInteger,
        message: '{VALUE} debe ser un número entero'
    }
},
})