import express from 'express'; 
import {listOfUsers, registerUser, deleteUser, loginUser} from '../controllers/users.ts'

const router = express.Router()           

router.get( '/users/' , listOfUsers);

router.post( '/login-tokens', loginUser);

router.post( '/register', registerUser);

router.delete( '/users/', deleteUser);

export default router;