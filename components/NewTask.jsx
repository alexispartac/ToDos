import React from "react";
import { useContext, useState } from "react";
import { ListContext } from "../Context/ModuleContext";

export default function NewTask() {
    const [task, setTask] = useState('')
    const {addTaskToList} = useContext(ListContext)

    const hendleSubmit = (e) => {
        if(task)
            addTaskToList(task);

        setTask('');
        e.preventDefault();
    }


    return ( 
        <div className="new-task" style={{width:"100%"}}>
            <form style={{width:"inherit"}} onSubmit={hendleSubmit}>
                <input type="text" 
                    style={{width:"90%", margin:"40px 0px", height:"30px", borderRadius:"10px", border:"2px solid black" ,textIndent:"10px"}} 
                    name="new-task" id="1" placeholder="New task" value={task} onChange={ (e) => setTask(e.target.value)}/>
                <input type="submit" style={{width:"10%", height:"30px"}}/>
            </form>
        </div>
    );
}