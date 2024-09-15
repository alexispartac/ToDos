import { useState, useEffect } from "react";
import axios from 'axios'
import { ListContext } from "./ModuleContext";
import React from "react";
 
export const ProviderList = ({children}) => {
    const [listTasks, setListTasks] = useState([]);

    // Lista de todos salvate
    const getTasks = async() => {

        try {
            const response = await axios.get("http://localhost:8080/tasks/alltasks", 
                {
                    params : {
                        "id": "66e2f161d97835c549ddc640"
                    }
                }
            );
            const allTasks = response.data.tasks;
            setListTasks(allTasks);

        }catch (error) {
            if (!error.response) {
              console.log('Network error:', error);
            } else {
              console.log('Error response:', error.response);
            }
        }
    };

    useEffect(() => {
        getTasks();
        if(!listTasks)
            console.log('ToDoS nu auu fost incarcate!')
    }, []);
    //

    const addTaskToList = async(item) => {

        setListTasks([ ...listTasks, {text: item}])
        console.log(listTasks)
    }

    const completeTask = (item) => {       
        setListTasks(listTasks.filter(itemTask => item.id !== itemTask.id))     
    }

    return (
        <ListContext.Provider 
            value={{
                listTasks,
                addTaskToList,
                completeTask
            }}>
            {children}
        </ListContext.Provider>
    );
}