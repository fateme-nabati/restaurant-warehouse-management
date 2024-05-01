import { pool } from "../../../db"
export const getAllFoods = async (req, res) => {

    await pool.query('SELECT * FROM food ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllFoods }
