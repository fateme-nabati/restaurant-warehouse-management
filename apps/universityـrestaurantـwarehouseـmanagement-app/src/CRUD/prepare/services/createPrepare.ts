import { pool } from "../../../db"
export const createPrepare= (req, res) => {
    const { restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no} = req.body
    console.log("date", date)
    const originalDate = new Date(date);
    console.log("original date", originalDate)
    originalDate.setDate(originalDate.getDate() + 1);
    console.log("original date", originalDate)
    const formattedDate = originalDate.toISOString().split('T')[0]
    console.log("formatted date", formattedDate)

    pool.query('INSERT INTO prepare (restaurant_id, food_id, date, meal, reserved_no, bought_daily_no, cooked_no, delivered_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [restaurant_id, food_id, formattedDate, meal, reserved_no, bought_daily_no, cooked_no, delivered_no], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Food with ID ${results.rows[0].food_id} added to preparations of restaurant with ID: ${results.rows[0].restaurant_id}`)
    })
  }

module.exports = {createPrepare}
