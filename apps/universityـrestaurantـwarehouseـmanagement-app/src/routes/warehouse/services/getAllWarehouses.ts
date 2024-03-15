import { pool } from "../../../db"
export const getAllWarehouses = async (req, res) => {

    await pool.query('SELECT w.id, w.name, w.manager_personnel_code, u.national_code AS manager_national_code, u.first_name AS manager_first_name, u.last_name AS manager_last_name, u.birth_date AS manager_birth_date, u.phone_number AS manager_phone_number FROM warehouse w INNER JOIN users u ON w.manager_personnel_code = u.personnel_code ORDER BY w.id ASC ', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = { getAllWarehouses }