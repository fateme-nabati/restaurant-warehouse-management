// import { app } from "../../main";
import { getAllFoods } from "./services/getAllFoods";
import { getFoodById } from "./services/getFoodById";
import { createFood } from "./services/createFood"
import { updateFood } from "./services/updateFood";
import { deleteFood } from "./services/deleteFood";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;