import { pool } from "../../../db"
export const updateExist = (req, res) => {

    const { warehouse_id, item_id, unit, amount } = req.body
    const found_warehouse_id = parseInt(req.params.warehouse_id)
    const found_item_id = parseInt(req.params.item_id)
  
    pool.query(
      'UPDATE exist SET warehouse_id = $1, item_id = $2, unit = $3, amount = $4 WHERE warehouse_id = $5 AND item_id = $6',
      [warehouse_id, item_id, unit, amount, found_warehouse_id, found_item_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Item with ID ${item_id} in warehouse with ID ${warehouse_id} modified`)
      }
    )
  }

module.exports = { updateExist }