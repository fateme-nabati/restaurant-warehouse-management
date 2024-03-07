// import { app } from "../../main";
import { getAllWarehouses } from "./services/getAllWarehouses";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllWarehouses);

module.exports = router;