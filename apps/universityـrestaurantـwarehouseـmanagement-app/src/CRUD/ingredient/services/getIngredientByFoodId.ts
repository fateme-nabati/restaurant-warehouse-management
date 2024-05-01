import { pool } from "../../../db"

export const getIngredientByFoodId = (req, res) => {
    const food_id = parseInt(req.params.food_id)
  
    pool.query('SELECT e.food_id, f.name AS food_name, e.item_id, i.name AS item_name, e.unit, e.amount FROM ingredient e INNER JOIN food f ON e.food_id = f.id INNER JOIN warehouse_item i ON e.item_id = i.id WHERE food_id = $1', [food_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getIngredientByFoodId}