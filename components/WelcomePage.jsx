import React from "react";
import { ProviderList } from "../Context/ListContext";
import ListOfTasks from "../components/ListOfTasks.jsx"
import NewTask from "../components/NewTask.jsx";

export default function WelcomePage({userID}) {

    return (
        <div className="continer">
            <ProviderList userID={userID}>
                <ListOfTasks/>
                <NewTask userID={userID}/> 
            </ProviderList>  
        </div>
    );
}