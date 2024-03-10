import { pool } from "../../../db"

export const getExistById = (req, res) => {
    const warehouse_id = parseInt(req.params.warehouse_id)
    const item_id = parseInt(req.params.item_id)
  
    pool.query('SELECT * FROM exist WHERE warehouse_id = $1 AND item_id = $2', [warehouse_id, item_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getExistById}