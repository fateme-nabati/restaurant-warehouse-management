/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { urlencoded } from 'express';
import * as path from 'path';

export const app = express();
app.use(express.json);
app.use(urlencoded({ extended : true}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
