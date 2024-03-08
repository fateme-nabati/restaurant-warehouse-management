import { pool } from "../../../db"
export const updateRestaurant = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, type, address, capacity, number_of_staff, manager_name, manager_id, manager_phone_number, supplier_warehouse_id } = req.body

    pool.query('UPDATE restaurant SET name = $1, type = $2, address = $3, capacity = $4, number_of_staff = $5, manager_name = $6, manager_id = $7, manager_phone_number = $8, supplier_warehouse_id = $9 WHERE id = $10', [name, type, address, capacity, number_of_staff, manager_name, manager_id, manager_phone_number, supplier_warehouse_id, id] , (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Restaurant modified with ID: ${id}`)
    })
  }

module.exports = { updateRestaurant }