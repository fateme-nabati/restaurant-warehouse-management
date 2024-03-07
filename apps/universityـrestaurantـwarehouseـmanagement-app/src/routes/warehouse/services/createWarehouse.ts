import { pool } from "../../../db"
export const createWarehouse = (req, res) => {
    const { name, address, manager_name, manager_id, manager_phone_number } = req.body
    pool.query('INSERT INTO warehouse (name, address, manager_name, manager_id, manager_phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, address,  manager_name, manager_id, manager_phone_number], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Warehouse added with ID: ${results.rows[0].id}`)
    })
  }

module.exports = {createWarehouse}