import * as React from "react"
import LoginPage from './features/Login/LoginPage.tsx'
import { CookiesProvider, useCookies} from 'react-cookie'
import WelcomePage from "./features/WelcomePage/WelcomePage.tsx";
import { User } from 'src/@types/user';

export default function App(){
    const [token, setToken, removeToken] = useCookies(['user'])
    const [user, setUser] = React.useState<User>(
        {
            username: '',
            password: ''
        }
    )
    
    React.useEffect( () => {
        removeToken('user');
    }, [])

    function handleLogin(accessToken: string) {
        setToken('user', accessToken, { path: '/' });
    }

    function handleLogout() {
        removeToken('user');
    }
    
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
