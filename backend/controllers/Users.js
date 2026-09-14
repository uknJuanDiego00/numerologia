import User from "../models/Users.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middelwares/validarToken.js";

// Crear usuario
export const crearUsuario = async (req, res) => {
    try {
        const {
            nombre_completo,
            email,
            password,
            fecha_nacimiento
        } = req.body;

        // Verificar si el correo ya existe
        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                message: "El correo ya está registrado"
            });
        }

        // Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear usuario
        const user = await User.create({
            nombre_completo,
            email,
            password: passwordHash,
            fecha_nacimiento
        });

        res.status(201).json({
            message: "El usuario se ha registrado con éxito.",
            user: {
                id: user._id,
                nombre_completo: user.nombre_completo,
                email: user.email,
                fecha_nacimiento: user.fecha_nacimiento
            }
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};


// Verificar usuario / iniciar sesión
export const verificarUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ email });

        // Si no existe
        if (!user) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        // Comparar contraseña
        const isMatch = await bcryptjs.compare(
            password,
            user.password
        );

        // Contraseña incorrecta
        if (!isMatch) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        // Generar JWT
        const token = await generarJWT(user._id);

        // Login correcto
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user._id,
                nombre_completo: user.nombre_completo,
                email: user.email,
                fecha_nacimiento: user.fecha_nacimiento
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};
