const express=require('express');
const Controller = require('../Controlador/Controller');
const Rutas=express.Router();

//EN LOS CONST UTILIZAMOS Y LLAMAMOS LAS LIBRERIAS NECESARIAS
Rutas.get('/',Controller.index);
Rutas.get('/login',Controller.login);
Rutas.get('/Vistavendedor',Controller.vendedor);
Rutas.get('/index',Controller.comprador);
Rutas.get('/ambos',Controller.ambos);
Rutas.get('/falta',Controller.confi);
Rutas.get('/falta2',Controller.confi2);


Rutas.get('/registro',Controller.registro);
Rutas.get('/registroco',Controller.registroco);
Rutas.get('/registroa',Controller.registroa);
Rutas.get('/detalles/:datid/:vehplaca',Controller.detalles);

Rutas.post('/InsertUsu',Controller.insertar);
Rutas.post('/InsertUsuco',Controller.insertarco);
Rutas.post('/InsertUsuam',Controller.insertaram);
Rutas.post('/BuscarVe',Controller.Buscarau);
Rutas.post('/entrar',Controller.loginentrar);
Rutas.post('/vehiculo',Controller.vehiculo);
Rutas.get('/Automoviles',Controller.Automoviles);
Rutas.get('/Camionetas',Controller.Camionetas);
Rutas.get('/Camperos',Controller.Camperos);
Rutas.get('/Deportivos',Controller.Deportivos);
Rutas.get('/Buses',Controller.Bus);
Rutas.get('/Motos',Controller.Moto);
Rutas.get('/Camiones',Controller.Camion);
Rutas.get('/Datos',Controller.Datos);
Rutas.get('/Cerrar',Controller.Cerrar);
Rutas.post('/actualizar',Controller.actualizar);
Rutas.post('/actualizarrol',Controller.actualizarrol);




Rutas.get('/Vendedor',Controller.cate);



module.exports=Rutas;