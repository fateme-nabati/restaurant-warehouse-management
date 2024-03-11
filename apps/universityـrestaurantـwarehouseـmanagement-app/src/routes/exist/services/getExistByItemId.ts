import { pool } from "../../../db"

export const getExistByItemId = (req, res) => {
    const item_id = parseInt(req.params.item_id)
  
    pool.query('SELECT e.warehouse_id, w.name AS warehouse_name, e.item_id, i.name AS item_name, e.unit, e.amount FROM exist e INNER JOIN warehouse w ON e.warehouse_id = w.id INNER JOIN warehouse_item i ON e.item_id = i.id WHERE item_id = $1', [item_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getExistByItemId}