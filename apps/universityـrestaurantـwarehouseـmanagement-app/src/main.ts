/* eslint @typescript-eslint/no-var-requires: "off" */
import express from 'express';
import * as path from 'path';
const warehouseRoutes = require('./routes/warehouse/route');
const restaurantRoutes = require('./routes/restaurant/route');
const warehouseItemRoutes = require('./routes/warehouseItem/route');
export const app = express();
app.use(express.json());
// app.use(urlencoded({ extended : true}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
console.log("start!");

app.use('/warehouses', warehouseRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/warehouseItems', warehouseItemRoutes);
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to universityـrestaurantـwarehouseـmanagement-app!',
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

// TOKEN ---> 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


