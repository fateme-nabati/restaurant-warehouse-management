import { pool } from "../../../db"

export const getWarehouseById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM warehouse WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getWarehouseById}