import { pool } from "../../../db"

export const getWarehouseItemById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT id, name, unit, price AS price_per_unit, type FROM warehouse_item WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getWarehouseItemById}