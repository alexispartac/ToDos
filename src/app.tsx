
import React from "react"
import LoginPage from '../components/LoginPage.jsx'
import { CookiesProvider, useCookies} from 'react-cookie'
import WelcomePage from "../components/WelcomePage.jsx";


export default function App(){
    const [token, setToken, removeToken] = useCookies(['user'])

    function handleLogin(accessToken) {
      setToken('user', accessToken, { path: '/' });
    }

    function handleLogout() {
      removeToken('user');
    }
    console.log("fe", typeof token.user)
    return (

        <div className="app">
            <CookiesProvider>
                <div>
                    {token.user ? 
                        <WelcomePage userToken={token.user} onLogout={handleLogout}/>  : <LoginPage onLogin={handleLogin} />}
                </div>
            </CookiesProvider>
        </div>
    );
}
