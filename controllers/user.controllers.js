const User = require('../models/user.model')
const bcrypt=require("bcrypt")
const saltRounds=10
const SECRET=process.env.SECRET
const jwt = require ('jsonwebtoken')
async function getUsers(req,res){
    
    try {
        
        const users=await User.find()
        console.log(users)

        return res.status(200).send(users)




    } catch (error) {
        console.log(  error)
        res.status(500).send("Error al obtener usuaruis")
    }



}


async function createUser(req, res) {
    // Verificación si la contraseña no está presente en el cuerpo de la solicitud
    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "Necesitas una contraseña"
        });
    }

    try {
        // Crear un nuevo usuario con los datos del request body
        const user = new User(req.body);

        // Encriptar la contraseña usando bcrypt
        bcrypt.hash(user.password, saltRounds, (error, hash) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    ok: false,
                    message: "Error al encriptar la contraseña"
                });
            }

            // Asignar la contraseña encriptada al usuario
            user.password = hash;

            // Guardar el nuevo usuario en la base de datos
            user.save().then((nuevoUser) => {
                console.log(nuevoUser);
                res.status(201).send(nuevoUser);
            }).catch(error => {
                console.log(error);
                res.status(500).send({
                    ok: false,
                    message: "El usuario no se pudo crear"
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Ocurrió un error en el servidor"
        });
    }
}


    async function getUsersById(req, res) {
        try {
            const { id } = req.params;

            if(req.user.role!=="admin"&&id!==req.user.id){
                return res.status(403).send({
                    message:"NO PODES"
                })
            }
            const user = await User.findById(id); // Nuevamente, asegúrate de que 'User' está en mayúscula
           
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }
            user.password=undefined
            console.log(user);
            return res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).send("No se pudo obtener el usuario de la base de datos");
        }
    }
    
    // Eliminar un usuario
    async function deleteUser(req, res) {

        try {
            
            const { id } = req.params;
            const deleteUser = await User.findByIdAndDelete(id); // Cambia 'user' a 'User'
            if (!deleteUser) {
                return res.status(404).send("Usuario no encontrado");
            }
            return res.status(200).send("El usuario fue borrado");
        } catch (error) {
            console.log(error);
            return res.status(500).send("No se pudo borrar el usuario de la base de datos");
        }
    }

    async function updateUser(req,res) {
        try {
            const{id}=req.params


            if(req.user.role !=="admin"&&id!==req.user._id){
                return res.status(403).send({
                    message:"NO PODES"
                })
            }
            const user= await User.findByIdAndUpdate(id, req.body,{new:true})
            return res.status(200).send({
                ok:true,
                massage:"SE PUDO",
                user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send("No se pudo actualizar la base de datos")
        }
    }

    async function login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(`Email: ${email}, Password: ${password}`);
    
            // Validar que los campos de email y password estén presentes
            if (!email || !password) {
                return res.status(400).send({
                    message: "Faltan datos: email o contraseña son obligatorios"
                });
            }
    
            // Buscar el usuario por su email
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).send({
                    message: "Usuario no encontrado"
                });
            }
    
            // Comparar la contraseña con bcrypt
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).send({
                    message: "Contraseña incorrecta"
                });
            }
    
            // Eliminar la contraseña del usuario antes de devolverlo
            user.password = undefined;
    
            // Firmar el token con jwt (recuerda definir la variable SECRET correctamente)
            const token = jwt.sign(user.toJSON(), SECRET, {
                expiresIn: '1h' // Duración de 1 hora para el token
            });
    
            console.log(`Token generado: ${token}`);
    
            // Devolver la respuesta de éxito
            return res.status(200).send({
                message: "Inicio de sesión correcto",
                user,
                token
            });
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return res.status(500).send({
                message: "Error interno del servidor"
            });
        }
    }
    
module.exports={
    getUsers,
    createUser,
    getUsersById,
    deleteUser,
    updateUser,
    login
}