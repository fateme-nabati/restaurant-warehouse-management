import { pool } from "../../../db"
import bcrypt from 'bcrypt'
const saltRounds = 10;
export const updateUser = async (req, res) => {
    const found_personnel_code = parseInt(req.params.personnel_code)
    const { personnel_code, national_code, first_name, last_name, birth_date, phone_number, password } = req.body
  
    const hashed_password = await bcrypt.hash(password, saltRounds)

    pool.query(
      'UPDATE users SET personnel_code = $1, national_code = $2, first_name = $3, last_name = $4, birth_date = $5, phone_number = $6, password = $7 WHERE personnel_code = $8',
      [personnel_code, national_code, first_name, last_name, birth_date, phone_number, hashed_password, found_personnel_code],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with personnel code: ${personnel_code}`)
      }
    )
  }

module.exports = { updateUser }