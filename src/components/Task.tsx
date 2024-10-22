import * as React from "react";
import { TProps } from "../@types/props"
import axios from "axios"; 
import styles from '../features/WelcomePage/styles.module.css'
import { memo } from "react";
import { useTaskDispatch } from "../features/Context/todoContext";
import { TaskDispatch } from "src/@types/task";

const DELETE_TASK_URL = 'http://localhost:8080/tasks';
const UPDATE_TASK_URL = 'http://localhost:8080/tasks';

const Task: React.FC<TProps> = ({task, userToken}) => {
    const dispatch: React.Dispatch<TaskDispatch> = useTaskDispatch();
    const [edit, setEdit] : [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);
    const [formData, setFormData]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState(task.description) ;

    const handleDelete = async() => {

        try{
            await axios.delete(DELETE_TASK_URL, {
                headers: {
                    accessToken : userToken
                },
                params: {
                    id: task.id
                }
            })

        } catch (error) {
            alert('The task was not deleted!')
        }

        dispatch({id :task.id, type: 'delete'});
    }

    const handleUpdate = async() => {
        const taskNewDescription = {...task, description: formData};

        try{
            await axios.patch(UPDATE_TASK_URL, 
            taskNewDescription,
            {
                headers: {
                    accessToken : userToken
                },
            }
        )

        } catch (error) {
            alert('The task was not updated!')
        }

        dispatch({task: taskNewDescription, type: 'edit'});
        setEdit(false); 
    }

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(e.target.value)
    }

    return (
        <div className={styles.task}>
            { 
                !edit ?
                    <p className={styles.text} onClickCapture={() => setEdit(true)}> { task.description } </p> 
                : 
                    <section>
                        <input 
                            className={styles.editdata} 
                            type="text"
                            value={formData}
                            onChange={e => handleFormData(e)}
                            />
                        
                        <button 
                            type="button" 
                            onClick={handleUpdate}
                            className={styles.buttonsave}
                            disabled={formData === ""}
                        > Save </button>
                    </section>
            }
            {
                !edit ? 
                    <button className={styles.buttoncomplete} onClick={handleDelete} > 
                        Complete
                    </button>
                : null
            }
        </div>
    );
}

export default memo(Task);