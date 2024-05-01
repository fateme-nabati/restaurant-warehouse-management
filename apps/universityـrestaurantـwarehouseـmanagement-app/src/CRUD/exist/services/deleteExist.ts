import { pool } from "../../../db"
export const deleteExist = (req, res) => {
    const warehouse_id = parseInt(req.params.warehouse_id)
    const item_id = parseInt(req.params.item_id)
  
    pool.query('DELETE FROM exist WHERE warehouse_id = $1 AND item_id = $2', [warehouse_id, item_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Item with ID ${item_id} deleted from warehouse with ID: ${warehouse_id}`)
    })
  }