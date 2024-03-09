import { pool } from "../../../db"
export const deleteFood = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM food WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Food deleted with ID: ${id}`)
    })
  }