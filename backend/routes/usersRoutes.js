import express from 'express'; 
import {listOfUsers, addNewUser, deleteUser} from '../controllers/users.js'

const router = express.Router()           

//
router.get( '/allusers' , listOfUsers);

router.post( '/register/', addNewUser);

router.delete( '/remove/', deleteUser);

export default router;