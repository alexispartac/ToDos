import express from 'express'; 
import {listOfTasks, addNewTask, completeTask, deleteTask} from '../controllers/tasks.js'

const router = express.Router()           

//
router.get( '/alltasks/', listOfTasks)

router.patch( '/newtask/', addNewTask);

router.patch( '/completetask', completeTask);

router.delete( '/deletetask', deleteTask);

export default router;