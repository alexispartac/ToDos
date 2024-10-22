import express from 'express'; 
import {listOfTasks, addNewTask, deleteTask, updateTask} from '../api/tasks.ts'

const router = express.Router()           

router.get( '/', listOfTasks)

router.post( '/', addNewTask);

router.delete( '/', deleteTask);

router.patch( '/', updateTask);

export default router;