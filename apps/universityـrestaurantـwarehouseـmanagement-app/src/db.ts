import {Pool} from 'pg';
// const Pool = require('pg').Pool
export const pool = new Pool({
  user: 'fateme',
  host: 'localhost',
  database: 'restaurantـwarehouseـmanagement',
  password: 'mollaali',
  port: 5432,
})