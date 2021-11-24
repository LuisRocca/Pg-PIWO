const { Router } = require("express");
const { Op } = require("sequelize");
const { User, Beer } = require("../db.js");
const {showAll} = require("../methods/index.js");

const router = Router();


router.get("/", async (req, res) => {
  try {
    const beers = await showAll();
    Beer.bulkCreate(
      beers
      )
    res.json(beers)
  }
  catch (err) {
    console.log(err);
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const beersAll = await showAll()
  if(id){
    const beersId = beersAll.filter(i => i.ID === id)
    beersId.length ? res.status(200).send(beersId) :
    res.status(404).send('id no valido')
  }
})



  module.exports = router;