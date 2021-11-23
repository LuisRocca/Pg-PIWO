const { Router } = require("express");
const { Sequelize } = require('sequelize');
const { User, Beer, Review } = require('../db.js');
const router = Router();

// ruta ---> localhost:3001/review/beer/idBeer/user/iduser <--CREANDPO COMENTARIOS
// router.post('/', (req, res) => {
//     const {idBeer, idUser} = req.params
//     const {commentary , calification} = req.body
  
//   })