const { Router } = require("express");
const { Op } = require("sequelize");
const { User, Beer } = require("../db.js");
const {showAll} = require("../methods/index.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const beers = await showAll();
    res.json(beers)
  }
  catch (err) {
    console.log(err);
  }  
})

  module.exports = router;