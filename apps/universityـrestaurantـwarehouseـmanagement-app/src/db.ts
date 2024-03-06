import {Pool} from 'pg';
// const Pool = require('pg').Pool
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurantـwarehouseـmanagement',
  password: 'postgres',
  port: 5432,
})