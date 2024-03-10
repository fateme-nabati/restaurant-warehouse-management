// import { app } from "../../main";
import { getAllExists } from "./services/getAllExists";
import { getExistById } from "./services/getExistById";
import { createExist } from "./services/createExist"
import { updateExist } from "./services/updateExist";
import { deleteExist } from "./services/deleteExist";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllExists);
router.get('/:warehouse_id/:item_id', getExistById);
router.post('/', createExist);
router.put('/:warehouse_id/:item_id', updateExist);
router.delete('/:warehouse_id/:item_id', deleteExist);

module.exports = router;