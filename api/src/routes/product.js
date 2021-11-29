const { Router } = require("express");
const { Product, Beer } = require("../db.js");
const router = Router();


router.post("/", async (req, res) => {
  const { id, name, notes, beers } = req.body; 
    try {
      const productAdd = await Product.create({        
        id: id,
        name: name,
        notes: notes,
    });
    const product = await Product.findOne({
      where: {
        id: productAdd.id
      },
      include: [
        {
          model: Beer,
          as: "beers",
          include: [
            {
              model: Product,
              as: "products",
              attributes: ["name"]
            }
          ]
        }
      ]
    });
    beers.forEach(async (beer) => {
      await product.addBeer(beer);
    });
    res.json(product);
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


  router.get("/", async (req, res) => {
    try {
      const product = await Product.findAll({
        include: {
          model: Beer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.json(product);
    } catch (error) {
      res.status(400).send("Algo no esta bien!");
    }
  });

module.exports = router;