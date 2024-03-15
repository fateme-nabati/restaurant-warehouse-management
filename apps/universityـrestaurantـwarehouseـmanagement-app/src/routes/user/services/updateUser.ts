import { pool } from "../../../db"
export const updateUser = (req, res) => {
    const found_personnel_code = parseInt(req.params.personnel_code)
    const { personnel_code, national_code, first_name, last_name, birth_date, phone_number  } = req.body
  
    pool.query(
      'UPDATE users SET personnel_code = $1, national_code = $2, first_name = $3, last_name = $4, birth_date = $5, phone_number = $6 WHERE personnel_code = $7',
      [personnel_code, national_code, first_name, last_name, birth_date, phone_number, found_personnel_code],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with personnel code: ${personnel_code}`)
      }
    )
  }

module.exports = { updateUser }