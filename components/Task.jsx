import React from "react";
import { useContext, useState} from "react";
import { ListContext } from "../Context/ModuleContext";
import axios from "axios";

const DELETE_TASK_URL = 'http://localhost:8080/tasks/deletetask'

export default function Task({task, userID}){
    const { deleteTask } = useContext(ListContext) 
    const [ checked, setChecked ] = useState(false)

    async function deleteTaskfromDB(){
        try {
            await axios.delete(DELETE_TASK_URL, {
                params: {
                    userID: userID, 
                    task: task.text
                }
            })
            console.log(`${task.text} a fost sters!`)
        } catch (error) {
            console.log(error); 
            alert('Task ul nu a fost sters!')
        }
    }

    function handleDelete(){
        deleteTask(task);
        deleteTaskfromDB();
        return setChecked(false);
    }

    return (
        <div className="task">
            <form style={{width:"5%"}}>
                <input type="checkbox" 
                        style={{width:"20px", height:"20px"}} 
                        name="task"     
                        checked = {checked}
                        onChange={ () => handleDelete() }
                />
            </form>
            <p style={{width:"30%", margin:"auto", textAlign:"center"}}> {task.text} </p>
        </div>
    );
}