import { ITask, TaskDispatch } from "src/@types/task";
import uuid4 from 'uuid4'

const tasksReductor = (tasks: ITask[], action: TaskDispatch) => {
    
    switch (action.type) {
        case "add":{
            return [ ...tasks, 
                {
                    id: uuid4(),
                    description: action.description,
                    status: false
                }
            ];
        }
        case "delete":{
            return tasks.filter((task: ITask) => task.id !== action.id);
        } 
        case "tasks":{
            return [...action.data];
        }
        case "edit": {
            return tasks.map( (task) => {
                if(task.id === action.task.id)
                    return action.task;
                else
                    return task;
            })
        }

        default:
            throw new Error("Unkonwn action: ");
            
    }


}


export default tasksReductor;