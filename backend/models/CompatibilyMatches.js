import mongoose, { Schema } from "mongoose";


const compMachesSchema = new mongoose.Schema({
    
    user_a:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    user_b:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    score:{
        type:Number,
        required: true,
        min: 0,
        max:100
    },
    ai_interpretation: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
});