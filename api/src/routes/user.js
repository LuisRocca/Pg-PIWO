const { Router } = require("express");
const { User, Beer } = require("../db.js");
const router = Router();

// localhost:3001/users body: {
//     "name": "Juliokk",
//     "username": "JulioPerucho",
//     "email": "ju155512@gmail.com",
//     "age" : "34",
//     "beers": [2]
// }

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
  
  //   for (const i of beers) {
  //     const beer = await Beer.findOne({
  //       where: {
  //         id: i,
  //       },
  //     });
  
  //   beer.addUser(userAdd);
  // }
    res.json({userAdd, Exito: "usuario creado "});
    catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  };

module.exports = router;