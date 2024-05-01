import { pool } from "../../../db"

export const getRestaurantById = async (req, res) => {
    const id = parseInt(req.params.id)
  
    await pool.query('SELECT r.id, r.name, r.type, r.address, r.capacity, r.number_of_staff, r.manager_personnel_code, u.national_code AS  manager_national_code, u.first_name AS manager_first_name, u.last_name AS manager_last_name, u.birth_date AS manager_birth_date, u.phone_number AS manager_phone_number, r.supplier_warehouse_id, w.name AS supplier_warehouse_name FROM restaurant r INNER JOIN users u ON r.manager_personnel_code = u.personnel_code INNER JOIN warehouse w ON r.supplier_warehouse_id = w.id  WHERE r.id = $1 ORDER BY r.id ASC', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getRestaurantById}