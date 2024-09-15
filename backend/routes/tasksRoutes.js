import express from 'express'; 
import {listOfTasks, addNewTask} from '../controllers/tasks.js'

const router = express.Router()           

//
router.get( '/alltasks/', listOfTasks)

router.patch( '/newtask/', addNewTask);

export default router;