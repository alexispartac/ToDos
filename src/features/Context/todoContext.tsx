import * as React from "react"
import { TaskContextType, ITask } from "../../@types/task"
import { Props } from "../../@types/props"
import { getTasks } from "../../utilss/functions/getData"
import tasksReductor from "../../utilss/functions/tasksReductor"

export const TaskContext = React.createContext<TaskContextType | null>(null);
export const TaskProvider: React.FC<Props> = ({children , userToken}) => {
    const [status, setStatus] = React.useState('idle');
    const [tasks, dispach] = React.useReducer(tasksReductor, []);

    /***** Task's actions *****/
    const saveTask = React.useCallback( 
        (task: ITask) => 
            dispach({
                description : task.description, type: 'addtask'
            })
        , [tasks]);
    
    
    const deleteTask = React.useCallback(
        (id: string) => { 
            dispach(
                {id : id, type: 'deletetask'}
            )
        }
    ,[tasks]);
    
    /***** *****/

    /***** The list of tasks from DB *****/

    React.useLayoutEffect( () => {
        setStatus('panding')
        setTimeout( () => {
            getTasks(userToken).then(data => {
                dispach({type: 'addtaskssave', data: data})
                setStatus('successful')
            }).catch(() => {
                setStatus('rejected')
            })
        }, 2000)
    }, [])

    /*****  *****/
    
    
    const actionsTask = React.useMemo(() => ({
        tasks,
        saveTask,
        deleteTask
    }), [])
    
    
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