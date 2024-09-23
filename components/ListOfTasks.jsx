import React from "react";
import { useContext } from "react";
import { ListContext } from "../Context/ModuleContext";
import Task from "./Task.jsx"
import './styles.css'


export default function ListOfTasks(){
    const { listTasks } = useContext(ListContext);
    
    return (
        <div className="list-of-tasks">
            <section>
                <h2 style={{borderBottom:"2px solid"}}>Tasks</h2>
                { listTasks.map( task => <Task id={task+'id'} task={task}/> )}
            </section>
        </div>
    );

}