// import { app } from "../../main";
import { getAllHaves } from "./services/getAllHaves";
import { getHaveByFoodId } from "./services/getHaveByFoodId";
import { getHaveByItemId } from "./services/getHaveByItemId";
import { getHaveByFoodIdAndItemId } from "./services/getHaveByFoodIdAndItemId";
import { createHave } from "./services/createHave"
import { updateHave } from "./services/updateHave";
import { deleteHave } from "./services/deleteHave";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllHaves);
router.get('/food/:food_id', getHaveByFoodId)
router.get('/item/:item_id', getHaveByItemId)
router.get('/:food_id/:item_id', getHaveByFoodIdAndItemId);
router.post('/', createHave);
router.put('/:food_id/:item_id', updateHave);
router.delete('/:food_id/:item_id', deleteHave);

module.exports = router;

