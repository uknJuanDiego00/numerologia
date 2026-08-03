import mongoose from "mongoose";

 const Data = async () =>{
    await mongoose.connect(process.env.DATA_URI)
    console.log("conexion exitosa con MongoDB")
}


export {Data}