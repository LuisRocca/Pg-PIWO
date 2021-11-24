const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const beerRouter = require('./beer.js');
const userRouter = require('./user.js');
const reviewRouter = require('./review.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/review', reviewRouter);
router.use('/beers', beerRouter);
router.use('/users', userRouter);

// router.use('/')



module.exports = router;
 