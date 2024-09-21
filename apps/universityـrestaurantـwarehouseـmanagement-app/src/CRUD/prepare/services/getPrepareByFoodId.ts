import { pool } from "../../../db"

export const getPrepareByFoodId = (req, res) => {
    const food_id = parseInt(req.params.food_id)
  
    pool.query('SELECT p.restaurant_id, r.name AS restaurant_name, p.food_id, f.name AS food_name, p.date, p.meal, p.reserved_no, p.bought_daily_no, p.cooked_no, p.delivered_no FROM prepare p INNER JOIN restaurant r ON p.restaurant_id = r.id INNER JOIN food f ON p.food_id = f.id WHERE food_id = $1', [food_id], (error, results) => {
      if (error) {
        throw error
      }
      
      results.rows.map((row) => row.date = row.date.toISOString().split('T')[0])
      res.status(200).json(results.rows)
    })
  }

module.exports = {getPrepareByFoodId}