import { pool } from "../../../db"

export const getExistByWarehouseId = (req, res) => {
    const warehouse_id = parseInt(req.params.warehouse_id)
  
    pool.query('SELECT e.warehouse_id, w.name AS warehouse_name, e.item_id, i.name AS item_name, e.unit, e.amount FROM exist e INNER JOIN warehouse w ON e.warehouse_id = w.id INNER JOIN warehouse_item i ON e.item_id = i.id WHERE warehouse_id = $1', [warehouse_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getExistByWarehouseId}