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
router.get('/:personnel_code', verify, getUserById);
router.post('/', verify, createUser);
router.put('/:personnel_code', verify, updateUser);
router.delete('/:personnel_code', verify, deleteUser);
router.post('/login', loginReq)
module.exports = router;