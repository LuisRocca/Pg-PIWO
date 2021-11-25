const server = require('./src/app.js');
const { conn, Beer} = require('./src/db.js');
const {showAll} = require('./src/methods/index.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { // este false es para que no guarde la data!
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const beers = await showAll();
    Beer.bulkCreate(
      beers
    )
  });
});
