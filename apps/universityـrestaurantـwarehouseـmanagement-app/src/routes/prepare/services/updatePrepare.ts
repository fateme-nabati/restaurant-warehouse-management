import { pool } from "../../../db"
export const updatePrepare = (req, res) => {

    const { restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no } = req.body 
    const found_restaurant_id = parseInt(req.params.restaurant_id)
    const found_food_id = parseInt(req.params.food_id)
  
    pool.query(
      'UPDATE have SET restaurant_id = $1, food_id = $2, date = $3, meal = $4, reserved_no = $5, bought_daily_no = $6, cooked_no = $7, delivered_no = $8 WHERE restaurant_id = $9 AND food_id = $10',
      [restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no, found_restaurant_id, found_food_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Food with ID ${food_id} in restaurant with ID ${restaurant_id} modified`)
      }
    )
  }

module.exports = { updatePrepare }