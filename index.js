const express = require('express');

const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('./productos.json');

const server = express();

const PORT= 8080

const numRandom =(min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const PATH = '/'
const callback = (request, response, next ) => {
    response.send({mensaje: 'hola mundo'});
};

server.get(PATH, callback);

//endopints productos 
server.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    console.log('productos: ',productos)
   res.json( productos);
})

// productos random
server.get('/productosRandom', async (req, res) => {
    const productos = await contenedor.getAll();
    const numeroRandom = numRandom(0, productos.length - 1);
   res.json( productos[numeroRandom]);
})

//inicio el server 
const callbackInit = () => {
   console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT,callbackInit);


//manejo de errores
server.on('error',(error)=> console.log("Error; ",error));