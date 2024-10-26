// const express = require('express');
// const app = express();
// const PORT = 3000;

// const mongoose = require('mongoose');

// const DATABASE_URL = "mongodb+srv://nachogonzalez:uqPPeip7EhmCNLPB@ecomnerce.bvvwc.mongodb.net/"

// // app.get('/', (req, res) => {
// //   res.send("Hola Mundo");
// // });

// // app.post('/products', (req, res) => {
// //   res.send("Creando un producto");
// // });

// mongoose.connect(DATABASE_URL).then(() => {
//     console.log("Conexión a la DB exitosa!");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   }).catch(error => console.log("Error al conectar a la DB!", error))
// const express = require('express');
// const app = express();
// const PORT = 3000;
// const mongoose = require('mongoose');

// const DATABASE_URL = "mongodb+srv://nachogonzalez:uqPPeip7EhmCNLPB@ecomnerce.bvvwc.mongodb.net/";

// app.get("/users", (req, res) => {
//     return res.send("Usuarios obtenidos");
// });

// mongoose.connect(DATABASE_URL).then(() => {
//     console.log("Conexión a la DB exitosa!");
    
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch(error => console.log("Error al conectar a la DB!", error));

// const express = require('express');
// const app = express();
// const PORT = 3000;
// const DATABASE_URL ="mongodb+srv://nacho:nachopasword@cluster1.tw1qj.mongodb.net/"
// app.get("/users", (req, res) => {
//     return res.send("Usuarios obtenidos");
// });

// // Comentar la conexión a MongoDB
// // mongoose.connect(DATABASE_URL).then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// // }).catch(error => {
// //     console.log("Error al conectar a la DB!", error);
// // });
// //RRXinfjFp9W59VdH


// console.log("HOLAAAAAAAAA")
// const http = require('http'); // petición - respuesta

// const server = http.createServer((request, response) => {
//   console.log(request.url, request.method);

//   if (request.url === '/products') {
//     return response.end('Estos son los productos de la base de datos');
//   }

//   if (request.url === '/users') {
//     return response.end('Estos son los usuarios de la base de datos');
//   }

//   return response.end('Respuesta desde el servidor');
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
// const mongoose = require('mongoose');

// // Tu URL de conexión de MongoDB
// const DATABASE_URL = "mongodb+srv://nacho:nachopasword@cluster1.tw1qj.mongodb.net/mydatabase?retryWrites=true&w=majority";

// // Conectar a MongoDB sin las opciones deprecadas
// mongoose.connect(DATABASE_URL)
//   .then(() => {
//     console.log("Conexión a MongoDB exitosa");
//   })
//   .catch((error) => {
//     console.log("Error al conectar a MongoDB:", error.message);
//   });
require('dotenv').config();

const app = require('./app');

const PORT = 3000;
const mongoose = require('mongoose');

const DATABASE_URL = "mongodb+srv://nacho:nachopasword@cluster1.tw1qj.mongodb.net/ecomerce";

mongoose.connect(DATABASE_URL).then(() => {
    console.log("\x1b[35m Conexión a la DB exitosa!");
    
    app.listen(PORT, () => {
        console.log(`\x1b[Server is running on port ${PORT}`);
    });
}).catch(error => console.log("Error al conectar a la DB!", error));
