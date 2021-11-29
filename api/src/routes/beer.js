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
      const byName = beersT.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
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
});

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

router.post('/:idBeer/category/:idCategory', (req, res) => {
  const {idBeer, idCategory} = req.params;
  Beer.findByPk(idBeer)
      .then((product) => {
          product.addCategories(idCategory)
          .then((newCategory) => {
              res.status(201).json({message: 'Se agregó categoría', newCategory})
          })
      })
      .catch((err) => {
          throw new Error(err)
      });
});

router.delete('/:idBeer/category/:idCategory', (req, res)=>{
const {idBeer, idCategory} = req.params;
Beer.findByPk(idBeer)
.then((beer)=>{a
  beer.removeCategories(idCategory)
  .then((newCategory)=> {
    res.status(201).json({message: "Se elimino correctamente la categoria", newCategory})
  })
})
.catch((err)=>{
  throw new Error(err)
})

})


  module.exports = router;

