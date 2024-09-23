import express from 'express'; 
import {listOfUsers, addNewUser, deleteUser, findUser} from '../controllers/users.js'

const router = express.Router()           

//
router.get( '/allusers' , listOfUsers);

router.get( '/user/one', findUser);

router.post( '/register/', addNewUser);

router.delete( '/remove/', deleteUser);

export default router;