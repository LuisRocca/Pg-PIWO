//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
<<<<<<< HEAD
const { conn,Beer} = require('./src/db.js');
=======
const { conn, Beer} = require('./src/db.js');
>>>>>>> master
const {showAll} = require('./src/methods/index.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { // este false es para que no guarde la data!
<<<<<<< HEAD
  server.listen(3001,async () => {
=======
  server.listen(3001, async () => {
>>>>>>> master
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const beers = await showAll();
    Beer.bulkCreate(
      beers
    )
  });
});

