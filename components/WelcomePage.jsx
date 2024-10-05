import React from "react";
import { ProviderList } from "../Context/ListContext";
import ListOfTasks from "../components/ListOfTasks.jsx"
import NewTask from "../components/NewTask.jsx";

const button_logout = {
    // position: 'relative', 
    // right:'-1080px', 
    // top:'-420px', 
    // width:'100px',
    // height:'30px',
};

export default function WelcomePage({userToken, onLogout}) {

    return (
        <div className="continer">
            <ProviderList userID={userToken}>
                <ListOfTasks userID={userToken}/>
                <NewTask userID={userToken}/> 
            </ProviderList>  
            <button 
                style={button_logout}
                onClick={onLogout}> Logout 
            </button>
        </div>
    );
}