const { Router } = require("express");
const { conn } = require("../db");
const { User, Beer, Review, Category } = conn.models;
const router = Router();


router.post("/create", async (req, res) => {
  const { name, beersOfCategory } = req.body; 
  try {
      const categoryAdd = await Category.create({name: name});
      const cervezaDb = await Beer.findAll({where: {name: beersOfCategory}});
      console.log('Name:', name)
      console.log('Cerveza que vamos a relacionar:', cervezaDb)
      categoryAdd.addBeer(cervezaDb);
      res.json('Categoria exitosamente creada Baby');  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
    /*res.status(201).json(category);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  });*/
    
    
    /*for (const i of beers) {
      const beer = await Beer.findOne({ where: {id: i} });
      beer.addCategory(categoryAdd);
    }

    res.json(categoryAdd);       
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});*/

// router.get("/", async (req, res) => {
//   try {
//     const product = await Product.findAll({
//       include: {
//         model: Beer,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });
//     return res.json(product);
//   } catch (error) {
//     res.status(400).send("Algo no esta bien!");
//   }
// });

module.exports = router;