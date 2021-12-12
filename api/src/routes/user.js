const server = require("express").Router();
const nodemailer = require("nodemailer");
var passport = require('passport');
const { User } = require('../db.js');
const { Beer } = require('../db.js');
const { Order } = require('../db.js');
const { OrderBeer } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');

const CreadorDeEncriptado = function (contrasenia) {
  return bcrypt.hashSync(contrasenia, bcrypt.genSaltSync(8), null);
}; 
 
//Crea ruta que devuelva usuarios//
//Get/users//
server.get('/', (req, res,next) => {
  User.findAll().then(users => { res.json(users); }).catch(error => { res.status(400).json({ error }) })
});

//crea ruta para crear usuario//
//POST/users//

server.post('/', (req,res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastName: req.body.lastName,
    address: req.body.address,
    image: req.body.image,
    admin: req.body.admin,
}).then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) })
});

//Crea ruta para modificar usuario
// PUT/ USERS/:id

server.put('/:id', (req, res) => {
User.findOne({
  where: {id: req.params.id}
}).then(user=>{
  user.update({
    username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            image: req.body.image,
            admin: req.body.admin,
        }).then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) });
    }).catch(error => { res.status(400).json({ error }) })
});

//Crea ruta para eliminar Usuario//
//DELETE/users/:id//

server.delete('/:id', (req, res) => {
  User.destroy({
    where: {id: req.params.id}
  }).then(deletedRecord => {
    if (deletedRecord === 1) { res.status(200).json({ message: "User deleted successfully" }); }
        else { res.status(404).json({ message: "User not found" }) }
    }).catch(error => { res.status(500).json(error); });
});

//Crea ruta para agregar item al carrito
//Post/users/:iduser/cart
// server.post('/:idUser/cart', (req, res) => {
//   Order.findOrCreate({
//       where: { userId: req.params.idUser, status: "open" },
//       defaults: { userId: req.params.idUser, status: "open", totalPrice: 0 }
//   }).then(order => {
//       OrderBeer.findOrCreate({
//           where: { beerId: req.body.beerId, orderId: order[0].id, },
//           defaults: { beerId: req.body.beerId, orderId: order[0].id, quantity: req.body.quantity }
//       }).then(orderBeer => {
//           if (orderBeer[1]) res.status(200).json(orderBeer[0])
//           else {
//               let cantidad = parseInt(req.body.quantity) + parseInt(orderBeer[0].quantity);
//               orderBeer[0].update({
//                   quantity: cantidad
//               }).then(orderBeer => { res.status(200).json(orderBeer) }).catch(error => { res.status(400).json({ error }) })
//           }
//       }).catch(error => { res.status(400).json({ error }) })
//   }).catch(error => { res.status(400).json({ error }) })
// })

server.post('/:idUser/cart', async (req, res) => {
  try {
    let user = await User.findByPk(req.params.idUser)
    // console.log(user.dataValues);
    let order = await Order.create({
        userId: req.params.idUser,
        status: 'open', 
        address: user.address, 
        email: user.email, 
        totalPrice: req.body.totalPrice,
        quantity: req.body.quantity
    })
    console.log(order);
    res.status(200).json(order)
  } catch (err) {
    console.log(err);
  }
})


//Crea ruta para retornar todos los items del carrito//
//GET/users/:idUser/cart//
//El carrito de un usuario va a ser la ultima "order" que tenga usuario. es decir se cierra orden ===> se crea una nueva//

server.get('/:idUser/cart', async (req, res) => {
  try {
   let ar = await Order.findAll({
      where: { userId: req.params.idUser },
    })
    res.status(200).json(ar)
  } catch (err) {
    res.json({msg: err})
  }
})

//Crea ruta para poder vaciar el carrito//
// DELETE /users/:idUser/cart/
server.delete('/:idUser/cart', (req,res)=> {
  order.findOne({
    where: { userId: req.params.idUser, status: "open" }
    }).then(order => {
        OrderBeer.destroy({
            where: { orderId: order.id }
        }).then(deletedRecord => {
            if (deletedRecord === 1) { res.status(200).json({ message: "Cart cleared successfully" }); }
            else { res.status(404).json({ message: "Cart not found" }) }
        }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})

//Crea ruta para eliminar un item del carrito//
//DELETE /users/:idUser/cart/:item//

server.delete('/:idUser/cart/:item', (req, res) => {
  Order.findOne({
      where: { userId: req.params.idUser, status: "open" }
  }).then(order => {
      OrderBeer.findOne({
          where: { orderId: order.id, beerId: req.params.item }
      }).then(OrderBeer => {
          OrderBeer.destroy({
              where: { beerId: req.params.item }
          }).then(deletedOrder => { res.status(200).json({ deletedOrder });
          }).catch(error => { res.status(400).json({ error }) })
      })
  })
})

//Crea ruta para editar las cantidades del carrito//
// PUT/users/:idUser/cart//

server.put('/:idUser/cart', (req, res) => {
  Order.findOne({
      where: { userId: req.params.idUser, status: "open" }
  }).then(order => {
      OrderBeer.findOne({
          where: { orderId: order.id, beerId: req.body.beerId }
      }).then(orderBeer => {
          if(req.body.quantity === 'sumar') {
              orderBeer.update({
                  quantity: orderBeer.quantity + 1
              })
              res.status(200).json({ orderBeer });
          }
          if(req.body.quantity === 'restar') {
              orderBeer.update({
                  quantity: orderBeer.quantity - 1
              })
              res.status(200).json({ orderBeer });
          }
      })
  }).catch(error => { res.status(400).json({ error }) })
})

//Crea ruta que retorne todas las ordenes de los usuarios//
//GET /users/:id/orders //

server.get('/:idUser/orders', (req, res) => {
  Order.findOrCreate({
      where: { userId: req.params.idUser, status: "closed" }
  }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
})

//Crea ruta de login//
//POST /users/login
// server.post('/login', (req, res) => {
//     var username = req.body.username, password = req.body.password;
//     User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) { res.redirect('/login'); }
//         else if (!user.validPassword(password)) { res.redirect('/login'); }
//         else {
//             req.session.user = user.dataValues;
//             res.redirect('/me');
//         }
//     });
// });

// server.post('/login',
// passport.authenticate('local'),
// function(req,res){
//   res.json(req.user);
// });
server.post('/google', 
  passport.authenticate('local',{failureMessage:"An error appeared"}),
  async function(req, res) {
    try {
      const user=req.user
      if (user) {
        res.status(200).json({user})
        // res.redirect('/beers')
      } else {
        console.log('usuario no encontrado');
      }
    } catch (err) {
      res.status(400).json({msg: 'esto fallo'}) 
    }
  });

server.get('/failed', (req, res) => res.send('No se ha podido logearte con google'))
//server.get('/good', isAuthenticated, (req, res) => res.send(`Se pudo logear con google, tu mail es ${req.user.emails[0].value}!`))

// server.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

//   server.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:3001/beers');
//   });

//Crea ruta de logout//
//POST /users/logout //

// server.post('/logout',
// function(req, res){
//   req.logout();
//   res.send('Usuario deslogueado');
// });

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    return res.json({ 
        isAdmin: false,
        message: 'User not authenticated'
    })
  }
}

function isAdmin(req, res, next) {
    if(req.user.admin === true) {
      next();
    } else {
      res.redirect('/admin');
    }
  }

//GET /users/me //

server.get('/me',
isAuthenticated,
function(req, res){
  return res.json(req.user);
});

// server.get('/admin',
//     isAuthenticated,
//     isAdmin,
//     function(req, res){
//     res.json(req.user);
//     {
//     res.status(401).send('No eres Administrador');  
//     }
// });

// server.get('/me',(req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.sendFile(__dirname + '/public/me.html');
//     } else { res.redirect('/login'); }
// });

// atributo admin al usuario 
server.put('/promote/:idUser', (req, res) => {
  User.findOne({
      where: { id: req.params.idUser}
  })
  .then (user => {
      user.update({
          admin: !user.admin
      }).then(user => {res.status(200).json ({user})})
}).catch(error => { res.status(400).json({ error }) })
});


//reset password//
server.put('/:id/passwordReset', async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    await user.update({password: req.body.password})
    await user.save()
    res.json(user)
  }catch (err) {
    console.log(err)
  }
  // const { password } = req.body;
  // const passwordNew = CreadorDeEncriptado(password);
  // try {
  //   const user = await User.findByPk(req.params.id);

  //   user.set({ password: passwordNew });
  //   await user.save();
  //   res.json({
  //     message: `La contraseña para el usuario: ${user.name}, se cambio exitosamente`,
  //   });
  // } catch (e) {
  //   res.status(401).json({
  //     error: `Aparecio un error al intentar cambiar la contraseña: ${e}`,
  //   });
  // }
})


//trae 1 usu.//

server.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
      // include: user.isAdmin
  })
      .then((user) => {
          if (!user) { return res.status(404).end(); }
          return res.json(user)
      })
      .catch(err => { console.log(err) });
});


server.post('/order-mail', (req, res) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "piwobeers@gmail.com",
          pass: "Piwo1104"
      } 
  }) 

  const mailOptions ={
    from : "Bruno Sentinelli <brunosentinelli@gmail.com>",
    to: req.body.email,
    subject: `¡Hola ${req.body.name}, gracias por tu compra en PIWO!!`,
    html: 
    `   <html>
	<head>
        <body>
        <h1> ¡Hola ${req.body.name}, gracias por tu compra! </h1>
            <h3>Tu pedido ha sido procesado y se encuentra pendiente de pago. Por favor, hacé click en <a href= "https://www.mercadopago.com.ar/home">este link<a/> para completarlo. </h3>
            <h2>Total de la compra: $${req.body.total} </h2>
            </body>
	</head>
</html>`
}
transporter.sendMail(mailOptions, (error, info) => {
  if(error) {
      res.status(500).send(error.message)
  } else {
      console.log("¡Email enviado con éxito!")
      res.status(200).json(req.body)
  }
})
});

module.exports = server;
