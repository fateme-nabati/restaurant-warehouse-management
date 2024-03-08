import { pool } from "../../../db"
export const deleteRestaurant = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM restaurant WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Restaurant deleted with ID: ${id}`)
    })
  }