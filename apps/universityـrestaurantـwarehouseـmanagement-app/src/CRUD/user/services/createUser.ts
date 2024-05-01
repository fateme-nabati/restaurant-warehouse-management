import { pool } from "../../../db"
import bcrypt from 'bcrypt'
const saltRounds = 10;
export const createUser = async (req, res) => {
    const {  personnel_code, national_code, first_name, last_name, birth_date, phone_number, password } = req.body

    const hashed_password = await bcrypt.hash(password, saltRounds)

    await pool.query('INSERT INTO users (personnel_code, national_code,  first_name, last_name, birth_date, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [personnel_code, national_code,  first_name, last_name, birth_date, phone_number, hashed_password], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with personnel code: ${results.rows[0].personnel_code}`)
    })
  }

module.exports = {createUser}