import { pool } from "../../../db"
export const deleteWarehouseItem = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM warehouse_item WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Warehouse item deleted with ID: ${id}`)
    })
  }