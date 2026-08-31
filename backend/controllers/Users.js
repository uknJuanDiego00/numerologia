import Users from "../models/Users"

// crear usuario

export const crearUsuario = async (req, res) =>{
    try{
        const {nombre_completo, email, password, fecha_nacimiento} =req.body;
        const user = await Users.create({nombre_completo, email, password, fecha_nacimiento});

        res.status(201).json(user);
    } catch (error){
        res.staus(400).json({message:"Error al crear el Usuario", error: error.message});
    }
};


export const verificarUsuario = async (req,res) =>{
    try{
        const {email, password} =req.body
        const user = await User.findOne({email});
        const isMatch = password===user?.password;

         if (!user || !isMatch) return res.status(401).json({
            mesagge: "Credenciales invalidas"
        });
    }
    catch (error) {
        res.status(400).json({
            mensaje: "Error al iniciar sesión",
            error: error.message
    });
}
}