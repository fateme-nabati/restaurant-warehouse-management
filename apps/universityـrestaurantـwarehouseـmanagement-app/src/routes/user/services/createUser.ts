import { pool } from "../../../db"
export const createUser = (req, res) => {
    const {  personnel_code, national_code, first_name, last_name, birth_date, phone_number } = req.body

    pool.query('INSERT INTO users (personnel_code, national_code,  first_name, last_name, birth_date, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [personnel_code, national_code,  first_name, last_name, birth_date, phone_number], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with personnel code: ${results.rows[0].personnel_code}`)
    })
  }

module.exports = {createUser}