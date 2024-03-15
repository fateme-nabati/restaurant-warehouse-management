import { pool } from "../db"
export const getNeededItems = async (req, res) => {
  // const rid = parseInt(req.params.rid);
  // const from_date = parseInt(req.params.from_date);
  // const to_date = parseInt(req.params.to_date);
  const {restaurant_id, from_date, to_date } = req.body; 

    await pool.query('(SELECT w.name AS item_name,  SUM(p.reserved_no*i.amount) AS amount, i.unit FROM prepare p INNER JOIN ingredient i ON p.food_id = i.food_id INNER JOIN warehouse_item w ON i.item_id = w.id WHERE p.restaurant_id = $1 AND p.date BETWEEN $2 AND $3 GROUP BY w.name, i.unit) UNION (SELECT w.name AS item_name, SUM(p.reserved_no*h.amount) AS amount, h.unit FROM prepare p INNER JOIN have h ON p.food_id = h.food_id INNER JOIN warehouse_item w ON h.item_id = w.id WHERE p.restaurant_id = $1 AND p.date BETWEEN $2 AND $3 AND p.date = h.date GROUP BY w.name, h.unit)', [restaurant_id, from_date, to_date],(error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getNeededItems };