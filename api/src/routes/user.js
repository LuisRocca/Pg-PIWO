const server = require("express").Router();
const nodemailer = require("nodemailer");
var passport = require('passport');
const { User } = require('../db.js');
const { Beer } = require('../db.js');
const { Order } = require('../db.js');
const { OrderBeer } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

 
//Crea ruta que devuelva usuarios//
//Get/users//
server.get('/', (req, res,next) => {
  User.findAll().then(users => { res.json(users); }).catch(error => { res.status(400).json({ error }) })
});

//crea ruta para crear usuario//
//POST/users//

server.post('/socialAuth', async (req, res, next) => {
  const { email, familyName, givenName, googleId, imageUrl, name } = req.body

  const user = await User.findOne({ where: { email } }).catch(error => { res.status(400).json({ error }) })

  if(user){
    return res.json(user)
  }else{
    const newUser = await User.create({
      username: email.split('@')[0],
      email,
      name,
      lastName: familyName,
      password: googleId,
      address: 'Otamendi 95',
      image: imageUrl
    })

    return res.json(newUser)
  }
});

server.post('/', async (req,res) => {  
try{
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastName: req.body.lastName,
    address: req.body.address,
    image: req.body.image,
    admin: req.body.admin,
})
// const order = await Order.create({
//     userId: user.id,
//     status: 'open', 
//     address: req.body.address, 
//     email: req.body.email, 
//     totalPrice: 0,
//     quantity: 1,
//     title: `producto ${user.username}`
//   })
// console.log('order para relacionar', order)
// user.addOrder(order)
// user = await User.findAll({include:{
//   model: Order,
//   attributes: ['totalPrice', 'title', 'id', 'status']
// }})

res.json(user)
}catch(error){
  console.log(error)
}
// .then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) })
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

//    CREAR ORDEN  --------------------------------------------------------
server.post('/:idUser/cart', async (req, res) => {
  try {
    // let carrito = req.body
    let user = await User.findByPk(req.params.idUser)
    let noc = []
    // console.log("ESTE ES LO QUE LLEGA DEL FRONT", req.body)
    // console.log(user.dataValues);
    // console.log(await Order.findByPk(req.params.idUser))
    var luis = await Order.findByPk(req.params.idUser)
    // console.log(luis, "comunicate luisillo")
   if ( luis === null )  {
    let order = await Order.create({
        userId: req.params.idUser,
        status: 'open', 
        address: user.address, 
        email: user.email, 
        title: `producto ${user.username}`,
        carrito: noc.concat(req.body),

    })
    res.status(200).json(order)
   } else {
     let order = await Order.update({
        address: user.address, 
        email: user.email, 
        title: `producto ${user.username}`,
        carrito: noc.concat(req.body),
     },
     {where:{
      userId: req.params.idUser,
      id: luis.id
     }})
     let orden = await Order.findByPk(req.params.idUser)
     res.status(200).json(orden)
   }
  } catch (err) {
    console.log(err);
  }
})

server.get('/list', async (req, res) => {
  try {
    let lt = await OrderBeer.findAll({
      include: {
        model: Beer,
        attributes: ['name']
      }
    })
    res.status(200).json(lt)
  }catch (err) {
    console.log(err);
  }
  }
  )
//CREAR ORDERBEER------------------------------------------------------------------------------------------------
server.post('/:idUser/list', async (req,res) => {
  try {
    const idUser = req.params.idUser
    const user = await User.findByPk(idUser, {include: {
      model: Order,
      attributes: ['title', 'totalPrice', 'id', 'status']
    }})
    let orden = user.orders.filter(el => el.status === 'open')
    console.log('esta es la orden', orden);
    orden = await Order.findByPk(orden[0].id)
    console.log('user', user)
    let carrito = req.body.carrito
    let beer
    let order
    let cart = []
    carrito.forEach( async(e) => {
      beer = await Beer.findByPk(e.id)
      order = await OrderBeer.create({
        price: e.price,
        quantity: e.quantity,
      })
      cart.push(order)
      console.log('order creada:', e.id)
      beer.addOrderBeer(order)
      // orden.addOrderBeer(order) 
    })

    console.log(cart);
    res.json(cart)

  } catch (err) {
    console.log(err)
  }
})


//Crea ruta para retornar todos los items del carrito//
//GET/users/:idUser/cart//
//El carrito de un usuario va a ser la ultima "order" que tenga usuario. es decir se cierra orden ===> se crea una nueva//

server.get('/:idUser/cart', async (req, res) => {
  try {
   let ar = await Order.findAll({
       where: { userId: req.params.idUser, status: 'open' },
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
    from : "PiwoBeers<piwobeers@gmail.com>",
    to: req.body.email,
    subject: `¡Hola ${req.body.name}, gracias por tu compra en PIWO!!`,
    html: 
    `   <html>
	<head>
        <body>
        <h1> ¡Hola ${req.body.name}, gracias por tu compra! </h1>
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
