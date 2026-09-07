const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.AUTENTICATOR_KEY,
      {
        expiresIn: "4h", //4h
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.AUTENTICATOR_KEY);
    let usuario = await Holder.findById(id);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido ", //- usuario no existe DB
      });
    }
    if (usuario.estado == 0) {
      return res.status(401).json({
        msg: "Token no válido ", //- usuario con estado: false
      });
    }
    req.usuario = usuario; //- pasamos el usuario al request para poder usarlo en cualquier peticion
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

export { validarJWT, generarJWT };
