import { pool } from "../../../db"
export const updateWarehouseItem = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, type, price, unit } = req.body
  
    pool.query(
      'UPDATE warehouse_item SET name = $1, type = $2, price = $3, unit = $4 WHERE id = $5',
      [name, type, price, unit, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Warehouse item modified with ID: ${id}`)
      }
    )
  }

module.exports = { updateWarehouseItem }