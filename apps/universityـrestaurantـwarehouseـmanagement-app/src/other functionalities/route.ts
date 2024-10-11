import * as express from 'express';
import { getNeededItems } from './getNeededItems';
import { getNeededItems2 } from './getNeededItems2';
import { getConsumedItems } from './getConsumedItems';
const router = express.Router();
// router.get('/needed_items/restaurant/:restaurant_id/from_date/:from_date/to_date/:to_date', getNeededItems);
router.post('/needed_items', getNeededItems);
router.post('/needed_items2', getNeededItems2);
router.post('/consumed_items', getConsumedItems)

 module.exports = router;
 