import { pool } from "../../../db"
export const deleteIngredient = (req, res) => {
    const food_id = parseInt(req.params.food_id)
    const item_id = parseInt(req.params.item_id)
  
    pool.query('DELETE FROM ingredient WHERE food_id = $1 AND item_id = $2', [food_id, item_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Item with ID ${item_id} deleted from ingredients of food with ID: ${food_id}`)
    })
  }