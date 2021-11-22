const { Router } = require("express");
const { Beer } = require("../db.js");
const { Op } = require("sequelize");
const axios = require("axios");

const router = Router();

const getApiBeer = async () => { 
  const beers = await Beer.findAll({
    attributes: ["id", "name", "image", "price", "stock", "impresion", "aroma", "flavor", "IBU", "AVB", "history", "ingredients"],
  });
console.log("beers", beers);

  if (!beers.length) {
    var allBeer = await axios.get("https://raw.githubusercontent.com/gthmb/bjcp-2015-json/master/json/styleguide-2015.json");
    allBeer = allBeer.data 

    console.log("allBeer", allBeer.data);
    allBeer = allBeer.styleguide.map((el) => {

      return {
            id: el.cca2,
            name: el.name,
            image: el.image,  
            price: el.price,
            stock: el.stock,
            impresion: el.impresion,
            aroma: el.aroma,
            flavor: el.flavor,
            IBU: el.IBU,
            AVB: el.AVB,
            history: el.history,
            ingredients: el.ingredients,
      }
    });


    await Beer.bulkCreate(allBeer);
    return allBeer;
  } else {
    return beers
  }};

  module.exports = router;