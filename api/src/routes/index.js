const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usuario = require('./usuario')
const post = require('./post')
const categoria = require('./categoria')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/usuario', usuario)
router.use('/post', post)
router.use('/categoria', categoria)


module.exports = router;
