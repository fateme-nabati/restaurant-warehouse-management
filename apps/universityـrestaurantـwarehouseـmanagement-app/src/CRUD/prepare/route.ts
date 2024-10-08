import { getAllPrepares } from "./services/getAllPrepares";
import { getPrepareByRestaurantId } from "./services/getPrepareByRestaurantId";
import { getPrepareByFoodId } from "./services/getPrepareByFoodId";
import { getPrepareByRestaurantIdAndFoodId } from "./services/getPrepareByRestaurantIdAndFoodId";
import { getPrepareByRestaurantIdAndDate } from "./services/getPrepareByRestaurantIdAndDate"
import { getPrepareByRestaurantIdAndFoodIdAndDate } from "./services/getPrepareByRestaurantIdAndFoodIdAndDate";
import { createPrepare } from "./services/createPrepare"
import { updatePrepare } from "./services/updatePrepare";
import { deletePrepare } from "./services/deletePrepare";
import { getFoodsByDate } from "./services/getFoodsByDate";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllPrepares);
router.get('/restaurant/:restaurant_id', getPrepareByRestaurantId)
router.get('/food/:food_id', getPrepareByFoodId)
router.get('/restaurant/:restaurant_id/food/:food_id', getPrepareByRestaurantIdAndFoodId);
router.get('/restaurant/:restaurant_id/date', getFoodsByDate)
router.get('/restaurant/:restaurant_id/date/:date', getPrepareByRestaurantIdAndDate);
router.get('/:restaurant_id/:food_id/:date', getPrepareByRestaurantIdAndFoodIdAndDate);
router.post('/', createPrepare);
router.put('/:restaurant_id/:food_id/:date', updatePrepare);
router.delete('/:restaurant_id/:food_id', deletePrepare);

module.exports = router;

