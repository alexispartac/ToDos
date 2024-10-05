import express from 'express'; 
import {listOfUsers, registerUser, deleteUser, loginUser} from '../controllers/users.js'

const router = express.Router()           

//
router.get( '/users/' , listOfUsers);

router.post( '/login-tokens', loginUser);

router.post( '/users/register/', registerUser);

router.delete( '/users/remove/', deleteUser);

export default router;