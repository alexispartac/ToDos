import { useState } from "react";
import uuid4 from "uuid4";
import { ListContext } from "./ModuleContext";
import React from "react";
 
export const ProviderList = ({children}) => {
    const [listTasks, setListTasks] = useState([]);

    const addTaskToList = (item) => {
        setListTasks([ ...listTasks, {text: item, id: uuid4()}])
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