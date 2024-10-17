import * as React from 'react'
import { User } from 'src/@types/user'
import styles from '../../features/WelcomePage/styles.module.css' 
import { memo } from 'react'

type InfoUserProps = {
    user : User;
    onLogout: () => void;
}

const InfoUser : React.FC<InfoUserProps> = ( {user, onLogout} ) => {
    const [on, setOn] = React.useState(false);
    
    const handleClick = () => setOn(!on);

    return(
        <section className={styles.header}>
                    <h2 className={styles.title}> Tasks </h2>
                    <section className={styles.auth}>
                        <button
                            className={styles.buttonuser}
                            onClick={handleClick}                            
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
    );
}


export default memo(InfoUser);