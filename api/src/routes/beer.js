const { Router } = require("express");
// const { Op } = require("sequelize");
// const { User, Beer } = require("../db.js");
const { conn } = require("../db");
const { User, Beer, Review } = conn.models;
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

router.post("/create",  (req, res) => {
  
  const { id , name , style, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples} = req.body;
  const cerveza = { id , name , style, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples }
    Beer.create(cerveza)
    .then((newBeer) =>{
      return res.status(200).json({ mesage:"exito",  newBeer})
    })
 .catch((error) =>{
  console.log(error)
  res.status(404).send(error)
})
   
});

router.put("/modify/:id",  (req, res) => {
  const {id} = req.params
  const { name , style, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples} = req.body;
  Beer.update({
    name , style, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples
 },{where: {id}})
 .then((beer)=>{
   res.status(200).send('Modificado correctamente')
  })
 .catch((err)=>{
   res.status(400).json(err)
   console.log(err)
  }) 
});

router.delete("/:id", (req, res) =>{
  const {id} = req.params;
	Beer.destroy({
		where: { id: id }
	}).then((resp) => {
		res.status(200).send("Producto con id: " + id + " fue eliminado")
	}).catch(function (err) {
		console.log("delete failed with error: " + err);
		
	});
})


  module.exports = router;

