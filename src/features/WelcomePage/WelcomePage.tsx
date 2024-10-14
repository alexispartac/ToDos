import React from "react";
import { TaskProvider } from "../Context/todoContext.tsx";
import Tasks from "../../components/Tasks.tsx"
import AddTask from "../../components/AddTask.tsx";
import styles from './styles.module.css'
import { User } from "src/@types/user";

type Props = {
    userToken: string; 
    user: User;
    onLogout: () => void;
};

const WelcomePage : React.FC<Props> = ({userToken, onLogout, user}) => {
    const [on, setOn] = React.useState(false);
    
    return (
        <div className={styles.app}>
                <section className={styles.header}>
                    <h2 className={styles.title}> Tasks </h2>
                    <section className={styles.auth}>
                        <button
                            className={styles.buttonuser}
                            onClick={() => setOn(!on)}                            
                            >  User
                        </button>
                        {
                            on ? 
                            <div className={styles.userinfo}>
                                <p>{user.username}</p>
                                <p>{user.password}</p>
                            </div> : null
                        }
                        <button 
                            className={styles.buttonlogout}
                            onClick={onLogout}> Logout 
                        </button>
                    </section>
                </section>
                <TaskProvider userToken={userToken}>
                    <Tasks userToken={userToken}/>
                    <AddTask userToken={userToken}/> 
                </TaskProvider>  
        </div>
        );
}

export default WelcomePage;