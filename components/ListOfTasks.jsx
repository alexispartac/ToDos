import React, { useEffect } from "react";
import { useContext } from "react";
import { ListContext } from "../Context/ModuleContext";
import Task from "./Task.jsx"


export default function ListOfTasks(){
    const { listTasks } = useContext(ListContext);
    
    return (
        <div className="list-of-tasks">
            <section>
                <h2 style={{borderBottom:"2px solid"}}>Tasks</h2>
                { listTasks.map( task => <Task task={task}/> )}
            </section>
        </div>
    );

}