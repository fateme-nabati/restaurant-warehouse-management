import { pool } from "../../../db"

export const getHaveByFoodIdAndItemId = (req, res) => {
    const food_id = parseInt(req.params.food_id)
    const item_id = parseInt(req.params.item_id)
  
    pool.query('SELECT h.food_id, f.name AS food_name, h.item_id, i.name AS item_name, h.unit, h.amount, h.date, h.meal FROM have h INNER JOIN food f ON h.food_id = f.id INNER JOIN warehouse_item i ON h.item_id = i.id WHERE food_id = $1 AND item_id = $2', [food_id, item_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getHaveByFoodIdAndItemId}