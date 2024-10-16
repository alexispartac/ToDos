import * as React from "react"
import LoginPage from './features/Login/LoginPage.tsx'
import { CookiesProvider } from 'react-cookie'
import WelcomePage from "./features/WelcomePage/WelcomePage.tsx";
import ConnectUser from "./utilss/hooks/ConnectUser.tsx";

export default function App(){
    const {token, user, setUser, handleLogin, handleLogout}= ConnectUser();
    
    return (

        <div>
            <CookiesProvider>
                { 
                     !token.user ? 
                    (
                        <LoginPage setUser={setUser} onLogin={handleLogin} />        
                    ) : (                        
                        <WelcomePage userToken={token.user} onLogout={handleLogout} user={user}/> 
                    )
                }
            </CookiesProvider>
        </div>
    );
}
