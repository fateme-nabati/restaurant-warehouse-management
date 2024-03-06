import { pool } from "../../../db"
export const getAllWarehouses = (req, res) => {
    pool.query('SELECT * FROM warehouse ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllWarehouses }