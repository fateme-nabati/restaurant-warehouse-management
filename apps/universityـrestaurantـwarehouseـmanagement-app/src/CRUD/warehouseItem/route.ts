// import { app } from "../../main";
import { getAllWarehouseItems } from "./services/getAllWarehouseItems";
import { getAllWarehouseItemsNames } from "./services/getAllWarehouseItemsNames";
import { getWarehouseItemById } from "./services/getWarehouseItemById";
import { createWarehouseItem } from "./services/createWarehouseItem"
import { updateWarehouseItem } from "./services/updateWarehouseItem";
import { deleteWarehouseItem } from "./services/deleteWarehouseItem";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllWarehouseItems);
router.get('/names', getAllWarehouseItemsNames);
router.get('/:id', getWarehouseItemById);
router.post('/', createWarehouseItem);
router.put('/:id', updateWarehouseItem);
router.delete('/:id', deleteWarehouseItem);

module.exports = router;