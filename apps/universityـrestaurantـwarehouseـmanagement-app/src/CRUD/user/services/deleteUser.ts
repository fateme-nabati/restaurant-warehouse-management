import { pool } from "../../../db"
export const deleteUser = (req, res) => {
    const personnel_code = parseInt(req.params.personnel_code)
  
    pool.query('DELETE FROM users WHERE personnel_code = $1', [personnel_code], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with personnel_code: ${personnel_code}`)
    })
  }