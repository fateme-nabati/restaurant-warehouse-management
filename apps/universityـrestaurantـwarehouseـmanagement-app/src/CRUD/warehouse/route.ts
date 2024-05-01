// import { app } from "../../main";
import { getAllWarehouses } from "./services/getAllWarehouses";
import { getWarehouseById } from "./services/getWarehouseById";
import { createWarehouse } from "./services/createWarehouse"
import { updateWarehouse } from "./services/updateWarehouse";
import { deleteWarehouse } from "./services/deleteWarehouse";
import * as express from 'express';
import { getWarehouseByManagerId } from "./services/getWarehouseByManagerId";
const router = express.Router();

router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.get('/manager/:manager_personnel_code', getWarehouseByManagerId)
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;