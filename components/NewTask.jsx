import React from "react";
import { useContext, useState } from "react";
import { ListContext } from "../Context/ModuleContext";
import axios from "axios";
import './styles.css'

export default function NewTask({userID}) {
    const [task, setTask] = useState('')
    const {addTaskToList} = useContext(ListContext)

    const addTask = async(item) =>{
        try{
            await axios.patch("http://localhost:8080/tasks/newtask", 
                {"task": item},
                {
                    params : {
                        "id": userID
                    }
                }
            )
            console.log(item)
        }catch (error) {
            if (!error.response) {
              console.log('Network error:', error);
            } else {
              console.log('Error response:', error.response);
            }
        }
    }

    const hendleSubmit = (e) => {
        if(task){
            addTask(task);
            addTaskToList(task);
        }else{
            console.log("Nu ati introdus nimic!")
        }

        setTask('');
        e.preventDefault();
    }


    return ( 
        <div className="new-task" style={{width:"100%"}}>
            <form style={{width:"inherit"}} onSubmit={hendleSubmit}>
                <input type="text" 
                    style={{width:"90%", margin:"40px 0px", height:"30px", borderRadius:"10px", border:"2px solid black" ,textIndent:"10px"}} 
                    name="new-task" id="1" placeholder="New task..." value={task} onChange={ (e) => setTask(e.target.value)}/>
                <input type="submit" style={{width:"10%", height:"30px"}}/>
            </form>
        </div>
    );
}