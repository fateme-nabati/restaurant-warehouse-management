import * as express from 'express';
import { getNeededItems } from './getNeededItems';
const router = express.Router();
router.get('/needed_items/restaurant/:restaurant_id/from_date/:from_date/to_date/:to_date', getNeededItems);

 module.exports = router;