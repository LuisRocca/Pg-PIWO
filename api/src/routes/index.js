const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const beerRouter = require('./beer.js');
const userRouter = require('./user.js');
const reviewRouter = require('./review.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/beers', beerRouter);
router.use('/users', userRouter);
// router.use('/')
// router.use('/review', reviewRouter);
const { conn} = require("../db");
const { User, Beer, Review } = conn.models;


// {
//   "commentary" : "una mierda esta cerveza",
//   "calification" : "1"
// }

router.post('/users/beer/:idBeer/user/:idUser', (req, res) => {
    const {idBeer, idUser} = req.params
    const {commentary , calification} = req.body

  console.log(idBeer, idUser, commentary, calification )
// if ( idUser || idBeer) {
  Beer?.findByPk(idBeer)
.then((beer) => {
  console.log("linea 32", beer)
   beer.addUsers(idUser)

  .then((newRew)=>{ 
    console.log("linea 38 <--->" , newRew)
    Review.update({commentary,calification},{
     where:{userId:idUser,beerId:idBeer}})
    .then(rev=>{
      res.status(201).json(rev)
    })
   })
})
// }
})

  
// Beer.findByPk(idBeer)
// .then((beer) => {
//   console.log("linea 32", beer)
//    beer.addUsers(idUser)
  
//   .then((newRew)=>{ 
//     Review.update({commentary,calification},{
//      where:{userId:idUser,beerId:idBeer}})
//     .then(rev=>{
//       res.status(201).json(rev)
//     })
//    })
//     .catch((err) => {
//       console.log(err)
//       res.status(400).send(err)
//        })
//      })
//   .catch((err) => {
//     console.log(err, "sss=>")
//     res.status(400).send(err)
//      })

module.exports = router;
 