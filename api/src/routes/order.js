const server = require("express").Router();
const { Order: Order } = require("../db.js");
const { OrderBeer: OrderBeer } = require("../db.js");
const { Beer: Beer } = require("../db.js");


<<<<<<< HEAD
/*server.get('/', (req, res) => {
    Order.findAll({
        where: { status: req.query.status }
    }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
});*/
server.get('/', (req, res) => {
    Order.findAll({
        include: [{
            model: OrderBeer,
            include: [{
                model: Beer
            }]
        }]
    }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
});

server.get('/:id', (req, res) => {
    OrderBeer.findAll({
        where: { orderId: req.params.id },
        include: [{ model: Beer }, { model: Order }]
    }).then(orderBeer => { res.json(orderBeer); }).catch(error => { res.status(400).json({ error }) })
});

server.put('/edit/:id', (req, res) => {
    Order.update({ status: req.body.status }, { where: { id: req.params.id } }).then(order => { res.json(order); }).catch(error => { res.status(400).json({ error }) })
});

server.delete('/:id', (req, res) => {
    Order.destroy({ where: { id: req.params.id } }).then(order => { res.json(order); }).catch(error => { res.status(400).json({ error }) })
});


    
/*server.put('/:id', (req, res) => {
    OrderBeer.findOne({
        where: { id: req.params.id }
        }).then(orderBeer => {
            orderBeer.update({
                beerId: req.body.beerId,
                quantity: req.body.quantity
            }).then(orderBeer => { res.status(200).json({ orderBeer }); }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
});*/

server.put('/:id/close', (req, res) => {
        Order.findOne({
            where: { id: req.params.id }
        }).then(order => {
            order.update({
                status: "closed",
                totalPrice: req.body.totalPrice,
                address: req.body.address,
                email : req.body.email
            }).then(order => { res.status(200).json({ order }); }).catch(error => { res.status(400).json({ error }) })
        }).catch(error => { res.status(400).json({ error }) })
});

server.post('/', (req,res) => {
        Order.create({
          totalPrice: req.body.totalPrice,
          status: req.body.status,
          address: req.body.address,
          email: req.body.email,
      }).then(order => { res.status(200).json({ order }); }).catch(error => { res.status(400).json({ error }) })
});

module.exports = server;
=======
// http://localhost:3001/order TRAE TODAS LAS ORDENES DE TODOS LOS USUARIOS 
server.get("/", (req, res) => {
  Order.findAll({
    where: { status: req.query.status },
  })
    .then((orders) => {
      res.json(orders);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// ESTE ME TRAE UNA SOLA ORDEN 
server.get("/:id", (req, res) => {
  OrderBeer.findAll({
    where: { orderId: req.params.id },
    include: [{ model: Beer }, { model: Order }],
  })
    .then((orderBeer) => {
      res.json(orderBeer);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// MODIFICA UNA ORDEN ??¿¿
server.put("/:id", (req, res) => {
  OrderBeer.findOne({
    where: { id: req.params.id },
  })
    .then((orderBeer) => {
      orderBeer
        .update({
          beerId: req.body.beerId,
          quantity: req.body.quantity,
        })
        .then((orderBeer) => {
          res.status(200).json({ orderBeer });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

// ESTA ES LA ORDEN FINAL! 
server.put("/:id/close", (req, res) => {
  Order.findOne({
    where: { id: req.params.id },
  })
    .then((order) => {
      order
        .update({
          status: "closed",
          totalPrice: req.body.totalPrice,
          address: req.body.address,
          email: req.body.email, // <-- aqui falta agregar el telefono que puce en el model
        })
        .then((order) => {
          res.status(200).json({ order });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = server;
>>>>>>> 2a676164c2d83eea7f9dcf28957ce50ce6e9bb49
