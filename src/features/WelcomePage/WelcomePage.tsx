import React from "react";
import { TaskProvider } from "../Context/todoContext.tsx";
import Tasks from "../../components/Tasks.tsx"
import AddTask from "../../components/AddTask.tsx";
import styles from './styles.module.css'
import { User } from "src/@types/user";
import InfoUser from "../../utilss/functions/InfoUser.tsx";

type Props = {
    userToken: string; 
    user: User;
    onLogout: () => void;
};

const WelcomePage : React.FC<Props> = ({userToken, onLogout, user}) => {

    return (
        <div className={styles.app}>
                <InfoUser user={user} onLogout={onLogout}/>
                <TaskProvider userToken={userToken}>
                    <Tasks userToken={userToken}/>
                    <AddTask userToken={userToken}/> 
                </TaskProvider>  
        </div>
        );
}

export default WelcomePage;