import * as React from "react"
import { ITask, TaskDispatch} from "../../@types/task"
import { Props } from "../../@types/props"
import { getTasks } from "../../utilss/functions/getData"
import tasksReducer from "../../utilss/functions/tasksReducer"


export const TaskContext = React.createContext<ITask[] | []>([]);
export const TaskDispatchContext = React.createContext<any>(null);

export const TaskProvider: React.FC<Props> = ({children , userToken}) => {
    const [status, setStatus]: [status: string, setStatus :  React.Dispatch<React.SetStateAction<string>>]= React.useState('idle');
    const [tasks, dispatch]: [tasks: ITask[], action: React.Dispatch<TaskDispatch>]= React.useReducer(tasksReducer, []);

    /***** The list of tasks from DB *****/

    React.useLayoutEffect( () => {
        setStatus('panding')
        setTimeout( () => {
            getTasks(userToken).then(data => {
                dispatch({type: 'tasks', data: data});
                setStatus('successful')
            }).catch(() => {
                setStatus('rejected')
            })
        }, 2000)
    }, [])

    /*****  *****/
    
    if(status === 'idle' || status === 'panding'){
        return <p>Is Loading...</p>;
    }
    
    if(status === 'rejected'){
        return <p>An error occurred!</p>;
    }
        
    return (
    <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
            {children}
        </TaskDispatchContext.Provider>
    </TaskContext.Provider>
    );
}

export function useTasks(){
    return React.useContext(TaskContext);
}

export function useTaskDispatch(){
    return React.useContext(TaskDispatchContext);
}