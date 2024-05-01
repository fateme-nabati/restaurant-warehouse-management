import { pool } from "../../../db"
export const updateHave = (req, res) => {

    const { food_id, item_id, unit, amount, date, meal } = req.body 
    const found_food_id = parseInt(req.params.food_id)
    const found_item_id = parseInt(req.params.item_id)
  
    pool.query(
      'UPDATE have SET food_id = $1, item_id = $2, unit = $3, amount = $4 , date = $5, meal = $6 WHERE food_id = $7 AND item_id = $8',
      [food_id, item_id, unit, amount, date, meal, found_food_id, found_item_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Item with ID ${item_id} beside food with ID ${food_id} modified`)
      }
    )
  }

module.exports = { updateHave }