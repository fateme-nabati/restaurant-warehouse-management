import { pool } from "../../../db"

export const getRestaurantById = async (req, res) => {
    const id = parseInt(req.params.id)
  
    await pool.query('SELECT * FROM restaurant WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getRestaurantById}