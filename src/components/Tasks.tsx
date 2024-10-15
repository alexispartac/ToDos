import * as React from "react";
import { TaskContext } from "../features/Context/todoContext.tsx";
import {TaskContextType, ITask} from "../@types/task"
import Task from "./Task.tsx"
import styles from '../features/WelcomePage/styles.module.css'
import { memo } from "react";

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
// memo folosit pentru a impiedica randarea componentei daca state ul nu se schimba
export default memo(Tasks);