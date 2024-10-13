import * as React from "react";
import { TaskContext } from "../Context/todoContext.tsx";
import {TaskContextType, ITask} from "../@types/task"
import Task from "./Task.tsx"
import styles from '../styles/styles.module.css'


const Tasks: React.FC<{userToken: string}> = ({userToken}) => {
    const { tasks, deleteTask } = React.useContext(TaskContext) as TaskContextType;
    
    return (
        <div >
            <section className={styles.tasks}>
            { 
                tasks.map( (task: ITask) => 
                <Task 
                    key={task.id} 
                    task={task} 
                    userToken={userToken} 
                    deleteTask={deleteTask} 
                />)
            }
            </section>
            
        </div>
    );

}

export default Tasks;