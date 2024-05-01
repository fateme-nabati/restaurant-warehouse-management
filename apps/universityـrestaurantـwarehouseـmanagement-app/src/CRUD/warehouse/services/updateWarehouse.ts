import { pool } from "../../../db"
export const updateWarehouse = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, address, manager_name, manager_id, manager_phone_number } = req.body
  
    pool.query(
      'UPDATE warehouse SET name = $1, address = $2, manager_name = $3, manager_id = $4, manager_phone_number = $5 WHERE id = $6',
      [name, address, manager_name, manager_id, manager_phone_number, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Warehouse modified with ID: ${id}`)
      }
    )
  }

module.exports = { updateWarehouse }