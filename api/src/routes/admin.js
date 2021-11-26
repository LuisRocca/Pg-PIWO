const { Router } = require("express");
const { Admin, Beer } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
    try {
   const { name, username, email, age, beers } = req.body;
   const adminAdd = await Admin.create({
      
      name: name,
      username: username,
      email: email,
      age: age,
      beers: beers,
    });

    res.send(adminAdd);
    }
    catch (err) {
      console.log(err);
    }
});

  router.get("/", async (req, res) => {
    try {
      const admins = await Admin.findAll({
        include: {
          model: Beer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.json(admins);
    } catch (error) {
      res.status(400).send("Algo no esta bien!");
    }
  });

module.exports = router;