// import { app } from "../../main";
import { getAllExists } from "./services/getAllExists";
import { getExistByWarehouseId } from "./services/getExistByWarehouseId";
import { getExistByItemId } from "./services/getExistByItemId";
import { getExistByWarehouseIdAndItemId } from "./services/getExistByWarehouseIdAndItemId";
import { createExist } from "./services/createExist"
import { updateExist } from "./services/updateExist";
import { deleteExist } from "./services/deleteExist";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllExists);
router.get('/warehouse/:warehouse_id', getExistByWarehouseId)
router.get('/item/:item_id', getExistByItemId)
router.get('/:warehouse_id/:item_id', getExistByWarehouseIdAndItemId);
router.post('/', createExist);
router.put('/:warehouse_id/:item_id', updateExist);
router.delete('/:warehouse_id/:item_id', deleteExist);

module.exports = router;