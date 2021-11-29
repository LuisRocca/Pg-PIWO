const { Router } = require("express");
const { Op } = require("sequelize");
const { User, Beer, Category } = require("../db.js");
const {getCategories, showAll} = require("../methods/index.js");

const router = Router();


router.get("/", async (req, res) => {
  const {name} = req.query
  const beersT = await Beer.findAll()
  try {
    if(name){
      const byName = 
      // const byName = await Beer.findAll({  
      //   where: {
      //     name: {
      //       [Op.iLike]: `%${name}%`,
      //     },
      //   },
      // });
       beersT.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
       byName.length ? 
      res.status(200).send(byName) :
      res.status(404).send('no se ha encontrado ninguna cerveza')
     }
     else {
       res.json(beersT)
     }   
  }
    catch (err) {
    console.log(err);
  }
  
})

// router.get("/", async (req, res) => {
//   const beer = await showAll()
//   try {
//     res.json(beer)
//   }
//   catch (err) {
//     console.log(err);
//   }
// })


router.get('/categories', async(req, res, next) => {
  try{
    const categories = await getCategories()
    res.status(200).send(categories)
  }catch(err){
    next(err)
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const beersAll = await showAll()
  if(id){
    const beersId = beersAll.filter(i => i.id === id)
    beersId.length ? res.status(200).send(beersId) :
    res.status(404).send('id no valido')
  }
});


  module.exports = router;

