import { pool } from "../../../db"

export const getFoodById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM food WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getFoodById}