import { useState, useEffect } from "react";
import axios from 'axios'
import { ListContext } from "./ModuleContext";
import React from "react";
 
export const ProviderList = ({children, userID}) => {
    const [listTasks, setListTasks] = useState([]);

    // Lista de todos salvate
    const getTasks = async() => {

        try {

            const response = await axios.get("http://localhost:8080/tasks", 
                {
                    headers : {
                        "userId": userID
                    }
                }
            );

            const allTasks = response.data.tasks;
            setListTasks(allTasks);

        }catch(error) {
            if (!error.response) {
              console.log('Network error:', error);
            } else {
              console.log('Error response:', error);
            }
        }
    };

    useEffect(() => {
        getTasks();
        if(!listTasks)
            console.log('ToDoS nu au fost incarcate!')
    }, []);

    const addTaskToList = async(item) => {

        setListTasks([ ...listTasks, {text: item}])
        console.log(listTasks)
    }

    const deleteTask = (item) => {       
        setListTasks(listTasks.filter(itemTask => item.text !== itemTask.text))     
    }

    return (
        <ListContext.Provider 
            value={{
                listTasks,
                addTaskToList,
                deleteTask
            }}>
            {children}
        </ListContext.Provider>
    );
}