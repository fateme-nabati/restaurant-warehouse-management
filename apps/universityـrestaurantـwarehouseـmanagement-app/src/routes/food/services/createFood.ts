import { pool } from "../../../db"
export const createFood = (req, res) => {
    const { name, price } = req.body

    pool.query('INSERT INTO food (name, price) VALUES ($1, $2) RETURNING *', [name, price], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Food added with ID: ${results.rows[0].id}`)
    })
  }

module.exports = {createFood}