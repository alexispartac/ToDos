import express from 'express'; 
import {listOfTasks, addNewTask, deleteTask} from '../controllers/tasks.js'

const router = express.Router()           

//
router.get( '/', listOfTasks)

router.patch( '/', addNewTask);

router.delete( '/', deleteTask);

export default router;