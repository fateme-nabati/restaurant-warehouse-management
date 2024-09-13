import { pool } from "../../../db"
export const updateFood = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, price } = req.body
  
    pool.query(
      'UPDATE food SET name = $1, price = $2 WHERE id = $3',
      [name, price, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({...results.rows[0], "message": `Food modified with ID: ${id}`})
      }
    )
  }

module.exports = { updateFood }