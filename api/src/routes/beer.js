const { Router } = require("express");
const { conn } = require("../db");
const { User, Beer, Review, Category } = conn.models;
const {getCategories, showAll} = require("../methods/index.js");

const router = Router();


router.get("/", async (req, res) => {
  const {name} = req.query
  const beersT = await Beer.findAll({
    include: [
    {
      model: Category,
      attributes: ['name'],
      through: { 
        attributes: []
      
    }}
  ]})
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
    const categories = await Category.findAll({
      include: [
      {
        model: Beer,
        attributes: ['name', 'IBU', 'price', 'ABV','image', 'stock'],
        through: { 
          attributes: []
        }
      }
    ]})
    res.status(200).send(categories)
  }catch(err){
    next(err)
  }
})

// ruta destinada para los detalles 

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const beersAll = await Beer.findAll()
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

//  ESTAS RUTAS SON CREAR MODIFICAR Y ELIMINAR CERVEZAS

router.post("/create",  async(req, res) => {
  
  const {  name, style, price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples} = req.body;
  const cerveza = { name , price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples }  
  const beer = await Beer.create(cerveza)
  const category = await Category.findAll({where: {name: style}})
  beer.addCategory(category)
  res.status(202).send('Creado')
});

router.put("/modify/:id",  (req, res) => {
  const {id} = req.params
  const { name , price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples} = req.body;
  Beer.update({
    name , price , stock , impression , aroma , img , IBU , ABV , history , ingredients , examples
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