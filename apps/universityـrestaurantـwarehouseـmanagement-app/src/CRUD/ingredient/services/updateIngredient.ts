import { pool } from "../../../db"
export const updateIngredient = (req, res) => {
    const found_food_id = parseInt(req.params.food_id)
    const found_item_id = parseInt(req.params.item_id)
    const { food_id, item_id, unit, amount } = req.body
    // const new_food_id = food_id
    // const new_item_id = item_id
    // const new_unit = unit
    // const new_amount = amount
    
  
    pool.query(
      'UPDATE ingredient SET food_id = $1, item_id = $2, unit = $3, amount = $4 WHERE food_id = $5 AND item_id = $6',
      [food_id, item_id, unit, amount, found_food_id, found_item_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Item with ID ${item_id} in food with ID ${food_id} modified`)
      }
    )
  }

module.exports = { updateIngredient }