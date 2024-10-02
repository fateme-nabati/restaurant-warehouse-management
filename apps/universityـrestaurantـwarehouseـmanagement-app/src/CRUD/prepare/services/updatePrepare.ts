import { pool } from "../../../db"
export const updatePrepare = (req, res) => {

    const { restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no } = req.body 
    const found_restaurant_id = parseInt(req.params.restaurant_id)
    const found_food_id = parseInt(req.params.food_id)
    const found_date = req.params.date

    if (!found_date || isNaN(Date.parse(found_date))) {
      return res.status(400).json({ error: 'Invalid date format in restaurant and date' });
    }

    const formattedDate = new Date(found_date).toISOString().split('T')[0]
  
    pool.query(
      'UPDATE prepare SET restaurant_id = $1, food_id = $2, date = $3, meal = $4, reserved_no = $5, bought_daily_no = $6, cooked_no = $7, delivered_no = $8 WHERE restaurant_id = $9 AND food_id = $10 AND date = $11',
      [restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no, found_restaurant_id, found_food_id, formattedDate],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Food with ID ${food_id} in restaurant with ID ${restaurant_id} modified`)
      }
    )
  }

module.exports = { updatePrepare }