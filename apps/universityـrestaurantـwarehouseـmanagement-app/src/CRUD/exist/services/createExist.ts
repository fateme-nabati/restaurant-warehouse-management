import { pool } from "../../../db"
export const createExist = (req, res) => {
    const { warehouse_id, item_id, unit, amount} = req.body

    pool.query('INSERT INTO exist (warehouse_id, item_id, unit, amount) VALUES ($1, $2, $3, $4) RETURNING *', [warehouse_id, item_id, unit, amount], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`item with ID ${results.rows[0].item_id} added to warehose with ID: ${results.rows[0].warehouse_id}`)
    })
  }

module.exports = {createExist}