// import { app } from "../../main";
import { getAllRestaurants } from "./services/getAllRestaurants";
import { getRestaurantByManagerId } from "./services/getRestaurantByManagerId";
import { getRestaurantBySupplierId } from "./services/getRestaurantBySupplierId";
import { getRestaurantById } from "./services/getRestaurantById";
import { createRestaurant } from "./services/createRestaurant"
import { updateRestaurant } from "./services/updateRestaurant";
import { deleteRestaurant } from "./services/deleteRestaurant";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/manager/:manager_personnel_code', getRestaurantByManagerId);
router.get('/supplier/:supplier_warehouse_id', getRestaurantBySupplierId);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;