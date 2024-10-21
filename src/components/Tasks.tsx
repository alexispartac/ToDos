import * as React from "react";
import { useTasks } from "../features/Context/todoContext.tsx";
import { ITask} from "../@types/task"
import Task from "./Task.tsx"
import styles from '../features/WelcomePage/styles.module.css'
import { memo } from "react";

const Tasks: React.FC<{userToken: string}> = ({userToken}) => {
    const tasks = useTasks();
    
    return (
        <div >
            <section className={styles.tasks}>
            { 
                tasks.length ?
                tasks.map( (task: ITask) => 
                <Task 
                    key={task.id} 
                    task={task} 
                    userToken={userToken} 
                />) :
                <h1> Introduceti taskuri:</h1>
            }
            </section>
            
        </div>
    );

}

export default memo(Tasks);