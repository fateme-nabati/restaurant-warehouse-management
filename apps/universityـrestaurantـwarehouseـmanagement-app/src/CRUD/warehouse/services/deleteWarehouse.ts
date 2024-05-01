import { pool } from "../../../db"
export const deleteWarehouse = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM warehouse WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Warehouse deleted with ID: ${id}`)
    })
  }