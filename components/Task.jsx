import React from "react";
import { useContext, useState} from "react";
import { ListContext } from "../Context/ModuleContext";

export default function Task({task}){
    const { completeTask } = useContext(ListContext) 
    const [ checked, setChecked ] = useState(false)

    return (
        <div className="task" id={task+'id'}>
            <form style={{width:"5%"}}>
                <input type="checkbox" 
                        style={{width:"20px", height:"20px"}} 
                        name="task"     
                        checked = {checked}
                        onChange={ () => {completeTask(task); return setChecked(false)} }
                />
            </form>
            <p style={{width:"30%", margin:"auto", textAlign:"center"}}> {task.text} </p>
        </div>
    );
}