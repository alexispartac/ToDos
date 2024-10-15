import * as React from "react"
import { TaskContextType, ITask } from "../../@types/task"
import { Props } from "../../@types/props"
import uuid4 from 'uuid4'
import axios from "axios"

const GET_TASKS_URL = "http://localhost:8080/tasks"

export const TaskContext = React.createContext<TaskContextType | null>(null);
export const TaskProvider: React.FC<Props> = ({children , userToken}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tasks, setTasks] = React.useState<ITask[]>([]);

    /***** The list of tasks from DB *****/
    const getTasks = async() => {
        try {
            const response = await axios.get(GET_TASKS_URL, 
                {
                    headers : {
                        accessToken: userToken
                    }
                }
            );
            
            setTasks([...tasks, ...response.data.tasks]);
            setLoading(false);
        }catch(error : any) {
            if (!error.response) {
                console.log('Network error:', error);
            } else {
                console.log('Error response:', error);
            }
        }
    };
    
    React.useEffect(() => {
        getTasks();
    }, []);

    if(loading){
        return <p>Loading...</p>;
    }
    
/*****  *****/

/***** Task's actions *****/
    const saveTask = (task: ITask) => {
        const newTask : ITask = {
                id: uuid4(),
                description: task.description,
                status: false
            }
        setTasks([ ...tasks, newTask])
        return newTask;
    }
    
    
    const deleteTask = (id: string) => { 
        setTasks(tasks.filter((task: ITask) => task.id !== id)) 
    }
    
    /***** *****/

    const actionsTask : TaskContextType = {
                tasks,
                saveTask,
                deleteTask
            }
    
    return (
        <TaskContext.Provider value={actionsTask}>
            {children}
        </TaskContext.Provider>
    );
}