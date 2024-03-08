import { pool } from "../../../db"
export const getAllRestaurants = async (req, res) => {

    await pool.query('SELECT * FROM restaurant ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllRestaurants }