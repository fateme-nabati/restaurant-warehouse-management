import { pool } from "../../../db"
export const getAllUsers = async (req, res) => {

    await pool.query('SELECT * FROM users ORDER BY personnel_code ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllUsers }