import express from 'express'; 
import {listOfUsers, registerUser, deleteUser, loginUser} from '../controllers/users.js'

const router = express.Router()           

//
router.get( '/' , listOfUsers);

router.post( '/login/', loginUser);

router.post( '/register/', registerUser);

router.delete( '/remove/', deleteUser);

export default router;