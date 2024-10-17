import * as React from "react"
import { TaskContextType, ITask } from "../../@types/task"
import { Props } from "../../@types/props"
import uuid4 from 'uuid4'
import { getTasks } from "../../utilss/functions/getData"

export const TaskContext = React.createContext<TaskContextType | null>(null);
export const TaskProvider: React.FC<Props> = ({children , userToken}) => {
    const [status, setStatus] = React.useState('idle');
    const [tasks, setTasks] = React.useState<ITask[]>([]);


    /***** The list of tasks from DB *****/

    React.useLayoutEffect( () => {
        setStatus('panding')
        setTimeout( () => {
            getTasks(userToken).then(data => {
                setTasks([...data, ...tasks]);
                setStatus('successful')
            }).catch(() => {
                setStatus('rejected')
            })
        }, 2000)
    }, [])

    /*****  *****/
    
    /***** Task's actions *****/
    const saveTask = React.useCallback( 
        (task: ITask) => {
            const newTask : ITask = {
                id: uuid4(),
                description: task.description,
                status: false
            }
            setTasks([ ...tasks, newTask])
            return newTask;
        }
    , [tasks]);
    
    
    const deleteTask = React.useCallback(
        (id: string) => { 
            setTasks(tasks.filter((task: ITask) => task.id !== id)) 
        }
    ,[tasks]);
    
    /***** *****/
    
    const actionsTask = React.useMemo(() => ({
        tasks,
        saveTask,
        deleteTask
    }), [tasks])
    
    
    if(status === 'idle' || status === 'panding'){
        return <p>Is Loading...</p>;
    }
    
    if(status === 'rejected'){
        return <p>An error occurred!</p>;
    }
        
    return (
    <TaskContext.Provider value={actionsTask}>
        {children}
    </TaskContext.Provider>
    );
}