import { pool } from "../../../db"

export const getPrepareByRestaurantIdAndDate = (req, res) => {
    const restaurant_id = parseInt(req.params.restaurant_id)
    const date = req.params.date

    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Invalid date format in restaurant and date' });
    }

    const formattedDate = new Date(date).toISOString().split('T')[0]

    // const startOfDay = `${formattedDate}T00:00:00.000Z`;
    // const endOfDay = `${formattedDate}T23:59:59.000Z`;

    pool.query(`SELECT p.restaurant_id, r.name AS restaurant_name, p.food_id, f.name AS food_name, p.date, p.meal, p.reserved_no, p.bought_daily_no, p.cooked_no, p.delivered_no FROM prepare p INNER JOIN restaurant r ON p.restaurant_id = r.id INNER JOIN food f ON p.food_id = f.id WHERE restaurant_id = $1 AND p.date=$2`, [restaurant_id, formattedDate], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      results.rows.map((row) => {
        const originalDate = new Date(row.date);
        originalDate.setDate(originalDate.getDate() + 1);
        row.date = originalDate.toISOString().split('T')[0]
      })
     
      
      res.status(200).json(results.rows)
    })
  }

module.exports = {getPrepareByRestaurantIdAndDate}