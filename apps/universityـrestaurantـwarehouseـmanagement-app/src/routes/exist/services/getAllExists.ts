import { pool } from "../../../db"
export const getAllExists = async (req, res) => {

    await pool.query('SELECT w.name AS warehouse_name, i.name AS item_name, e.unit, e.amount FROM exist e INNER JOIN warehouse w ON e.warehouse_id = w.id INNER JOIN warehouse_item i ON e.item_id = i.id', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllExists }