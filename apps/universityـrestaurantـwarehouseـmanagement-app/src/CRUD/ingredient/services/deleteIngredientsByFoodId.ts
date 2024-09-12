import { pool } from "../../../db"
export const deleteIngredientsByFoodId = (req, res) => {
    console.log("we are in deleteIngredientByFoodId")
    const food_id = parseInt(req.params.food_id)
    // const item_id = parseInt(req.params.item_id)
  
    console.log("food_id: ", food_id);
    pool.query('DELETE FROM ingredient WHERE food_id = $1', [food_id], (error, results) => {
      if (error) {
        throw error("Error in delete ingredients by food_id");
      }
      res.status(200).send(`All items deleted from ingredients of food with ID: ${food_id}`)
    })
  }


module.exports = {deleteIngredientsByFoodId}