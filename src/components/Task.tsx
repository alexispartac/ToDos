import * as React from "react";
import { TProps } from "../@types/props"
import axios from "axios"; 
import styles from '../features/WelcomePage/styles.module.css'
import { memo } from "react";

const DELETE_TASK_URL = 'http://localhost:8080/tasks';

const Task: React.FC<TProps> = ({task, deleteTask, userToken}) => {

    const handleDelete = async() => {

        try{
            await axios.delete(DELETE_TASK_URL, {
                headers: {
                    accessToken : userToken
                },
                params: {
                    id: task.id
                }
            })

        } catch (error) {
            alert('The task was not deleted!')
        }

        deleteTask(task.id)
    }

    return (
        <div className={styles.task}>
            <p className={styles.text}> { task.description } </p>
            <button className={styles.buttoncomplete} onClick={handleDelete} > 
                Complete
            </button>
        </div>
    );
}

export default memo(Task);