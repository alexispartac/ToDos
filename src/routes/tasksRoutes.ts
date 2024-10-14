import express from 'express'; 
import {listOfTasks, addNewTask, deleteTask} from '../api/tasks.ts'

const router = express.Router()           

router.get( '/', listOfTasks)

router.post( '/', addNewTask);

router.delete( '/', deleteTask);

export default router;