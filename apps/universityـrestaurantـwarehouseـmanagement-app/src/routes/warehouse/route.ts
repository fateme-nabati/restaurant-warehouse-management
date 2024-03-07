// import { app } from "../../main";
import { getAllWarehouses } from "./services/getAllWarehouses";
import { getWarehouseById } from "./services/getWarehouseById";
import { createWarehouse } from "./services/createWarehouse"
import * as express from 'express';
const router = express.Router();

router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);

module.exports = router;