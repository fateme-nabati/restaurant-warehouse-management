import { pool } from "../../../db"

export const getUserById = (req, res) => {
    const personnel_code = parseInt(req.params.personnel_code)
  
    pool.query('SELECT * FROM users WHERE  personnel_code = $1', [personnel_code], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getUserById}