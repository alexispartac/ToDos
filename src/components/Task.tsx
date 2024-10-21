import * as React from "react";
import { TProps } from "../@types/props"
import axios from "axios"; 
import styles from '../features/WelcomePage/styles.module.css'
import { memo } from "react";
import { useTaskDispatch } from "../features/Context/todoContext";

const DELETE_TASK_URL = 'http://localhost:8080/tasks';

const Task: React.FC<TProps> = ({task, userToken}) => {
    const dispatch = useTaskDispatch();

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

        dispatch({id :task.id, type: 'delete'});
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