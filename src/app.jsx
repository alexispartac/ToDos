import React from "react"
import { ProviderList } from "../Context/ListContext";
import ListOfTasks from "../components/ListOfTasks.jsx"
import NewTask from "../components/NewTask.jsx";
import Register from "../components/Register.jsx";


export default function App(){
    return (
        <div className="app">
            <ProviderList>
                {/* <Register/> */}
                <ListOfTasks/>
                <NewTask />
            </ProviderList>
        </div>
    );
}