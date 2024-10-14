import React from "react";

const dataAccount = (user: any, styles: any) => {
    const [on, setOn] = React.useState(false);

    return (
        
        <>
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
        </>
    

    );
}


export default dataAccount;