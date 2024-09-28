import express from 'express'; 
import {listOfUsers, addNewUser, deleteUser, loginUser} from '../controllers/users.js'

const router = express.Router()           

//
router.get( '/allusers' , listOfUsers);

router.post( '/login/', loginUser);

router.post( '/register/', addNewUser);

router.delete( '/remove/', deleteUser);

export default router;