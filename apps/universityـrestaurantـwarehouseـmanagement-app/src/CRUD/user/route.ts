// import { app } from "../../main";
import { getAllUsers } from "./services/getAllUsers";
import { getUserById } from "./services/getUserById";
import { createUser } from "./services/createUser"
import { updateUser } from "./services/updateUser";
import { deleteUser } from "./services/deleteUser";
import { loginReq } from "./services/loginReq";
import { verify } from "../../utils/verify";
import * as express from 'express';
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:personnel_code', getUserById);
router.post('/', createUser);
router.put('/:personnel_code', updateUser);
router.delete('/:personnel_code', deleteUser);
router.post('/login', loginReq)
module.exports = router;