/* eslint @typescript-eslint/no-var-requires: "off" */
import express from 'express';
import * as path from 'path';
const userRoutes = require('./CRUD/user/route') 
const warehouseRoutes = require('./CRUD/warehouse/route');
const restaurantRoutes = require('./CRUD/restaurant/route');
const warehouseItemRoutes = require('./CRUD/warehouseItem/route');
const foodRoutes = require('./CRUD/food/route');
const existRoutes = require('./CRUD/exist/route');
const ingredientRoutes = require('./CRUD/ingredient/route');
const haveRoutes = require('./CRUD/have/route');
const prepareRoutes = require('./CRUD/prepare/route');
const otherRoutes = require('./other functionalities/route')
export const app = express();
app.use(express.json());
// app.use(urlencoded({ extended : true}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

   // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/users', userRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/warehouseItems', warehouseItemRoutes);
app.use('/foods', foodRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/exist', existRoutes);
app.use('/have', haveRoutes);
app.use('/prepare', prepareRoutes);
app.use('/', otherRoutes);
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to university restaurant warehouse management app!',
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);



