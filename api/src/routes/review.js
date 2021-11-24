const { Router } = require("express");
const { conn } = require("../db");
const { User, Beer, Review } = conn.models;
const router = Router();

// ruta ---> localhost:3001/review/beer/idBeer/user/idUser <--CREANDPO COMENTARIOS
// { objeto esperado! 
//   "commentary" : "una mierda esta cerveza",
//   "calification" : "1"
// }
router.post("/beer/:idBeer/user/:idUser", (req, res) => {
  const { idBeer, idUser } = req.params;
  const { commentary, calification } = req.body;

  Beer.findByPk(idBeer).then((beer) => {
    //  console.log(beer, "linea 13 <-----")
    beer
      .addUsers(idUser)

      .then((newRew) => {
        // console.log("linea 38 <--->" , newRew)
        Review.update(
          { commentary, calification },
          {
            where: { userId: idUser, beerId: idBeer },
          }
        ).then((rev) => {
          res.status(201).json(rev);
        });
      }).catch((err) => {
              console.log(err , "este es el segundo then --> error")  
              res.status(400).send(err)
              })
             }) .catch((err) => {
                console.log(err, "este es el primer then")
                res.status(400).send(err)
                 })
  });

  // Ruta --> MODIFICACION DEL REVIEW

  router.put( '/beer/:idBeer/user/:idUser', (req , res) =>{
    const { idBeer, idUser } = req.params;
    const { commentary, calification } = req.body;

    Review.update({calification, commentary},{
        where: {
            beerId: idBeer , 
            userId: idUser
        }
    }) .then((newData)=>{
        res.status(200).send(newData)
    }) .catch((error)=>{
        console.log(error)
        res.status(400).send(error)
    })

  });

module.exports = router;
