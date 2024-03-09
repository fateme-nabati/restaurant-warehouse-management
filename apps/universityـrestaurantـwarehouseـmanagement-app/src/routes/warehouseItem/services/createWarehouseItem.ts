import { pool } from "../../../db"
export const createWarehouseItem = (req, res) => {
    const { name, type, price, unit} = req.body

    pool.query('INSERT INTO warehouse_item (name, type, price, unit) VALUES ($1, $2, $3, $4) RETURNING *', [name, type, price, unit], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Warehouse item added with ID: ${results.rows[0].id}`)
    })
  }

module.exports = {createWarehouseItem}