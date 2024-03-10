import { pool } from "../../../db"
export const updateExist = (req, res) => {
    const warehouse_id = parseInt(req.params.warehouse_id)
    const item_id = parseInt(req.params.item_id)
    const { new_warehouse_id, new_item_id, new_unit, new_amount } = req.body
  
    pool.query(
      'UPDATE warehouse_item SET warehouse_id = $1, item_id = $2, unit = $3, amount = $4 WHERE warehouse_id = $5 AND item_id = $6',
      [new_warehouse_id, new_item_id, new_unit, new_amount, warehouse_id, item_id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Item with ID ${item_id} in warehouse with ID ${warehouse_id} modified`)
      }
    )
  }

module.exports = { updateExist }