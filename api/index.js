const server = require('./src/app.js');
const { conn, Beer} = require('./src/db.js');
const {showAll, getCategories} = require('./src/methods/index.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { // este false es para que no guarde la data!
  server.listen(process.env.PORT, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const categories = await getCategories();
    const beers = await showAll();
    console.log('%listos')
  });
});
