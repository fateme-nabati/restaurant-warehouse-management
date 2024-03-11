// import { app } from "../../main";
import { getAllIngredients } from "./services/getAllIngredients";
import { getIngredientByFoodId } from "./services/getIngredientByFoodId";
import { getIngredientByItemId } from "./services/getIngredientByItemId";
import { getIngredientByFoodIdAndItemId } from "./services/getIngredientByFoodIdAndItemId";
import { createIngredient } from "./services/createIngredient"
import { updateIngredient } from "./services/updateIngredient";
import { deleteIngredient } from "./services/deleteIngredient";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllIngredients);
router.get('/food/:food_id', getIngredientByFoodId)
router.get('/item/:item_id', getIngredientByItemId)
router.get('/:food_id/:item_id', getIngredientByFoodIdAndItemId);
router.post('/', createIngredient);
router.put('/:food_id/:item_id', updateIngredient);
router.delete('/:food_id/:item_id', deleteIngredient);

module.exports = router;