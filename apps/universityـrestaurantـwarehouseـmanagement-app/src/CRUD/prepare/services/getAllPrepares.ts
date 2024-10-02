import { pool } from "../../../db"
export const getAllPrepares = async (req, res) => {

    await pool.query('SELECT p.restaurant_id, r.name AS restaurant_name, p.food_id, f.name AS food_name, p.date, p.meal, p.reserved_no, p.bought_daily_no, p.cooked_no, p.delivered_no FROM prepare p INNER JOIN restaurant r ON p.restaurant_id = r.id INNER JOIN food f ON p.food_id = f.id', (error, results) => {
      if (error) {
        throw error
      }

      results.rows.map((row) => {
        const originalDate = new Date(row.date);
        originalDate.setDate(originalDate.getDate() + 1);
        row.date = originalDate.toISOString().split('T')[0]
      })
       
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllPrepares }