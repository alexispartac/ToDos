import { ITask } from "src/@types/task";
import uuid4 from 'uuid4'

type ActionProp = 
    | { description: string; type: 'addtask' }
    | { id: string; type: 'deletetask'}
    | { data: any; type: 'addtaskssave'};

const tasksReductor = (tasks: ITask[], action: ActionProp) => {
    switch (action.type) {
        case "addtask":{
            return [ ...tasks, 
                {
                    id: uuid4(),
                    description: action.description,
                    status: false
                }
            ];
        }
        case "deletetask":{
            return tasks.filter((task: ITask) => task.id !== action.id);
        } 
        case "addtaskssave":{
            return [...tasks, ...action.data];
        }

        default:
            throw new Error("Unkonwn action: ");
            
    }


}


export default tasksReductor;