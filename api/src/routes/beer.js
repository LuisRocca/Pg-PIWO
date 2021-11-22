const { Router } = require("express");
const { Op } = require("sequelize");
const { User, Beer } = require("../db.js");

const router = Router();

router.post("/", async (req, res) => {
    try {
   const { name, username, email, age, beers } = req.body;
   const userAdd = await User.create({
      
      name: name,
      username: username,
      email: email,
      age: age,
    });
  
    for (const i of beers) {
      const beer = await Beer.findOne({
        where: {
          id: i,
        },
      });
  
    beer.addUser(userAdd);
  }
    res.json(activityAdd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }});

  module.exports = router;