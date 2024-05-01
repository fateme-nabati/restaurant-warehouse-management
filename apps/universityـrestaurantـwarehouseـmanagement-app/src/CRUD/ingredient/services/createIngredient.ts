import { pool } from "../../../db"
export const createIngredient = (req, res) => {
    const { food_id, item_id, unit, amount} = req.body

    pool.query('INSERT INTO ingredient (food_id, item_id, unit, amount) VALUES ($1, $2, $3, $4) RETURNING *', [food_id, item_id, unit, amount], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`item with ID ${results.rows[0].item_id} added to ingredients of food with ID: ${results.rows[0].food_id}`)
    })
  }

module.exports = {createIngredient}