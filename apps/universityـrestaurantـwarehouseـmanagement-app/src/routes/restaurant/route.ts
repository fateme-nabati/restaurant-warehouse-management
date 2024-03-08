// import { app } from "../../main";
import { getAllRestaurants } from "./services/getAllRestaurants";
import { getRestaurantById } from "./services/getRestaurantById";
import { createRestaurant } from "./services/createRestaurant"
import { updateRestaurant } from "./services/updateWarehouse";
import { deleteRestaurant } from "./services/deleteRestaurant";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;