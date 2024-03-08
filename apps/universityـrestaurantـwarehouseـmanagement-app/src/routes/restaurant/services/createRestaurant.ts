import { pool } from "../../../db"
export const createRestaurant = (req, res) => {
    const { name, type, address, capacity, number_of_staff, manager_name, manager_id, manager_phone_number, supplier_warehouse_id } = req.body

    pool.query('INSERT INTO restaurant (name, type, address, capacity, number_of_staff, manager_name, manager_id, manager_phone_number, supplier_warehouse_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [name, type,address, capacity, number_of_staff,manager_name, manager_id, manager_phone_number, supplier_warehouse_id] , (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Restaurant added with ID: ${results.rows[0].id}`)
    })
  }

module.exports = {createRestaurant}