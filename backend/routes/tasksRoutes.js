import express from 'express'; 
import {listOfTasks, addNewTask, deleteTask} from '../controllers/tasks.js'

const router = express.Router()           

//
router.get( '/alltasks/', listOfTasks)

router.patch( '/newtask/', addNewTask);

router.delete( '/deletetask', deleteTask);

export default router;