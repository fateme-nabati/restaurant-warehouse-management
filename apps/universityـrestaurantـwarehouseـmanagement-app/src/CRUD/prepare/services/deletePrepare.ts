import { pool } from "../../../db"
export const deletePrepare= (req, res) => {
    const restaurant_id = parseInt(req.params.restaurant_id)
    const food_id = parseInt(req.params.food_id)
  
    pool.query('DELETE FROM prepare WHERE restaurant_id = $1 AND food_id = $2', [restaurant_id, food_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Food with ID ${food_id} deleted from preparations of restaurant with ID: ${restaurant_id}`)
    })
  }