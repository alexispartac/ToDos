
import React from "react"
import LoginPage from '../components/LoginPage.jsx'
import { CookiesProvider, useCookies} from 'react-cookie'
import WelcomePage from "../components/WelcomePage.jsx";

export default function App(){
    const [token, setToken, removeToken] = useCookies(['user'])

    function handleLogin(user) {
      setToken('user', user, { path: '/' });
    }

    function handleLogout() {
      removeToken('user');
    }

    return (

        <div className="app">
            <CookiesProvider>
                <div>
                    {token.user ? 
                        <WelcomePage userID={token.user.id} onLogout={handleLogout}/>  : <LoginPage onLogin={handleLogin} />}
                </div>
            </CookiesProvider>
        </div>
    );
}