import { pool } from "../../../db"
export const createHave= (req, res) => {
    const { food_id, item_id, unit, amount, date, meal} = req.body

    pool.query('INSERT INTO have (food_id, item_id, unit, amount, date, meal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [food_id, item_id, unit, amount, date, meal], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`item with ID ${results.rows[0].item_id} added to dish sides of food with ID: ${results.rows[0].food_id}`)
    })
  }

module.exports = {createHave}