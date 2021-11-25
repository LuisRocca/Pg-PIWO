const { Router } = require("express");
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
      beers: beers,
    });

    res.send(userAdd);
    }
    catch (err) {
      console.log(err);
    }
});

  router.get("/", async (req, res) => {
    try {
      const users = await User.findAll({
        include: {
          model: Beer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.json(users);
    } catch (error) {
      res.status(400).send("Algo no esta bien!");
    }
  });

module.exports = router;