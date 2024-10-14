import * as React from "react";
import { TaskContext } from "../features/Context/todoContext.tsx";
import { TaskContextType, ITask } from '../@types/task';
import axios from "axios";
import styles from '../features/WelcomePage/styles.module.css'



const NewTask : React.FC<{userToken: string}> = ({userToken}) => {
    const [formData, setFormData] = React.useState<string>('') ;
    const { saveTask } = React.useContext(TaskContext) as TaskContextType;

    const addTask = async(task: ITask) =>{

        try{ 
            await axios.post("http://localhost:8080/tasks", 
                task,
                {
                    headers : {
                        accesstoken : userToken
                    }
                }
            )
            console.log(task)

        }catch (error: any) {
            if (!error.response) {
                console.log('Network error:', error);
            } else {
                console.log('Error response:', error.response);
            }
        }
    }
    
    const hendleSubmit = (e: React.FormEvent, formData: any) : void => {
        e.preventDefault();
        const newTask = saveTask({description: formData, status: false, id: '' });
        addTask(newTask);

        setFormData('')
    }


    return ( 
        <div className="new-task" style={{width:"100%"}}>
            <form style={{width:"inherit"}} onSubmit={e => hendleSubmit(e, formData)}>

                <input type="text" id="description" placeholder="New task..." onChange={e => setFormData(e.target.value) } value={formData}
                    className={styles.inputdata} 
                />
                <input type="submit" disabled={ formData === '' } style={{width:"10%", height:"30px"}}/>
            </form>
        </div>
    );
}

export default NewTask;