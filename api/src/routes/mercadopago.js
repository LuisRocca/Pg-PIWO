const { Order} = require('../db');
const server = require('express').Router();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: "TEST-8165276433250363-120722-129ddb09bd6c5a032ed6a9f98d41eb04-1034725152"
});



//Ruta que genera la URL de MercadoPago
// server.get("/", (req, res, next) => {
//   const { title, totalPrice, quantity, id} = req.body
//   // const id_orden= 1

// //   Cargamos el carrido de la bd
// // const carrito = req.body ? [{...req.body}] : {msg: 'no hay nada'}

// //   console.log(carrito, "linea 28 del mercadopago")
//   const items_ml =[ 
//   {
//     title: title,
//     unit_price: totalPrice,
//     quantity: totalPrice,
//   }
// ]
  

//   // Crea un objeto de preferencia
//   let preference = {
//     items: items_ml,
//     external_reference : `${id}`,
//     payment_methods: {
//       excluded_payment_types: [
//         {
//           id: "atm"
//         }
//       ],
//       installments: 3  //Cantidad máximo de cuotas
//     },
//     back_urls: {
//       success: 'http://localhost:3001/mercadopago/pagos',
//       failure: 'http://localhost:3001/mercadopago/pagos',
//       pending: 'http://localhost:3001/mercadopago/pagos',
//     },
//   };

//   mercadopago.preferences.create(preference)

//   .then(function(response){
//     // console.info('respondio')
//   //Este valor reemplazará el string"<%= global.id %>" en tu HTML
//     global.id = response.body.id;
//     res.json({ id: global.id });
//   })
//   .catch(function(error){
//     console.log( 'error del mercadopago', error);
//   })
// }) 

// let preference = {
//   items: items_ml,
//   external_reference : `${id}`, //`${new Date().valueOf()}`,
//   back_urls: {
//     success: 'http://localhost:3001/mercadopago/pagos',
//     failure: 'http://localhost:3001/mercadopago/pagos',
//     pending: 'http://localhost:3001/mercadopago/pagos',
//   }
// };
// res.json({id: global.id, init_point: response.body.init_point})

server.post('/', (req, res, next) => {
    // const {  title, totalPrice, quantity, id } = req.body
    // let {carrito}  = req.body
    let {body}  = req
    console.log('este es el fucking body', req.body.carrito);
    
    // console.log('MERCADOPAGO 81 body', carrito);
    // let title = carrito.map((e) =>  e.name)
    
    // let quantity = carrito.map((i) => i.quantity)
    // let unit_price = carrito.map((r) => r.price)
    // const gh =[ { 
    //          title: title[0],
    //         unit_price: unit_price[0],
    //         quantity: quantity[0]
    // },{
    //      title: title[1],
    //         unit_price: unit_price[1],
    //         quantity: quantity[1]
    // }]
    const gh = body.carrito.map(e => {
      return {
        title: e.name,
        quantity: Number(e.quantity),
        unit_price: e.price
      }
    })
     console.log("lindo y helmoso", gh)
    var preference = {
        items: 
         gh
        ,
        external_reference : `${req.body.id}`, //`${new Date().valueOf()}`,
        back_urls: {
            success: "http://localhost:3001/mercadopago/pagos",
            failure: "http://localhost:3001/mercadopago/pagos",
            pending: "http://localhost:3001/mercadopago/pagos"
        },
        auto_return: "approved"
    };
    console.log(preference);
    mercadopago.preferences.create(preference)
    .then(response => {
      res.json({id: global.id, init_point: response.body.id})
      console.log(response.body)
    })
})


//Ruta que recibe la información del pago
server.get("/pagos", (req, res)=>{
  // console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  Order.findByPk(external_reference)
  .then((order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "completed"
    console.info('Salvando order')
    order.save()
    .then((_) => {
      console.info('redirect success')
      
      return res.redirect("http://localhost:3000/beers")
    })
    .catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`:http//localhost:3000/?error=${err}&where=al+salvar`)
    })
  })
  .catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
  })

  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = server;

